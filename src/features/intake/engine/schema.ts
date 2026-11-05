import { evaluateCondition, resolveVisibleQuestions } from './engine';
import type { Answers, Condition, IntakeDefinition, Question } from '../config/types';

const record = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const localized = (v: unknown) => record(v) && typeof v.en === 'string' && typeof v.es === 'string' && !!v.en && !!v.es;
export function conditionReferences(c?: Condition): string[] {
  if (!c) return [];
  if ('all' in c) return c.all.flatMap(conditionReferences);
  if ('any' in c) return c.any.flatMap(conditionReferences);
  if ('not' in c) return conditionReferences(c.not);
  return [c.questionId];
}
function conditionValues(c: Condition | undefined, id: string): string[] {
  if (!c) return [];
  if ('all' in c) return c.all.flatMap(child => conditionValues(child, id));
  if ('any' in c) return c.any.flatMap(child => conditionValues(child, id));
  if ('not' in c) return conditionValues(c.not, id);
  return c.questionId !== id || c.value === undefined ? [] : Array.isArray(c.value) ? c.value : [c.value];
}
/** Trust boundary for local configuration and future remote CMS JSON. */
export function assertDefinition(value: unknown): asserts value is IntakeDefinition {
  const fail = (message: string): never => { throw new Error(`Intake definition: ${message}`); };
  if (!record(value) || typeof value.id !== 'string' || !value.id || typeof value.version !== 'string' || !value.version || !Array.isArray(value.questions) || !Array.isArray(value.stages) || !Array.isArray(value.routing) || !Array.isArray(value.destinations)) fail('expected a versioned flow, stages, questions and routing.');
  const raw = value as Record<string, unknown>;
  for (const stage of raw.stages as unknown[]) if (!record(stage) || !['about', 'work', 'preferences', 'contact', 'review'].includes(String(stage.id)) || !localized(stage.label)) fail('unsupported stage or missing localized stage label.');
  const def = value as IntakeDefinition;
  const stages = def.stages.map(s => s.id);
  if (new Set(stages).size !== stages.length || !stages.includes('review')) fail('duplicate stages or missing review stage.');
  const ids = new Map<string, number>();
  def.questions.forEach((q, index) => {
    if (!record(q) || typeof q.id !== 'string' || !q.id || ids.has(q.id) || q.id === 'review') fail(`duplicate or invalid question ID: ${q?.id}.`);
    ids.set(q.id, index);
    if (!stages.includes(q.stage) || !localized(q.title) || !localized(q.reviewLabel) || typeof q.required !== 'boolean' || typeof q.analyticsId !== 'string') fail(`${q.id}: invalid stage, localization or required/analytics configuration.`);
    if (q.description && !localized(q.description)) fail(`${q.id}: invalid description.`);
    if (q.type === 'single' || q.type === 'multi') {
      if (!Array.isArray(q.options) || !q.options.length) fail(`${q.id}: options must not be empty.`);
      const values = new Set<string>();
      for (const o of q.options) {
        if (!record(o) || typeof o.value !== 'string' || !o.value || values.has(o.value) || !localized(o.label)) fail(`${q.id}: duplicate/missing option value or localized label.`);
        values.add(o.value);
      }
      if (q.type === 'single' && (!['cards', 'options'].includes(q.presentation) || typeof q.autoAdvance !== 'boolean')) fail(`${q.id}: invalid single-select configuration.`);
      if (q.type === 'multi' && (!Number.isInteger(q.min) || q.min < 0 || q.min > q.options.length)) fail(`${q.id}: invalid minimum selections.`);
      if (q.type === 'multi' && q.selectAll && (!values.has(q.selectAll.value) || !q.selectAll.members.length || q.selectAll.members.some(v => !values.has(v) || v === q.selectAll?.value))) fail(`${q.id}: invalid select-all group.`);
    } else if (q.type === 'contact') {
      if (!Array.isArray(q.fields) || !q.fields.length || new Set(q.fields.map(f => f.id)).size !== q.fields.length) fail(`${q.id}: invalid contact fields.`);
      for (const f of q.fields) if (!record(f) || typeof f.id !== 'string' || !localized(f.label) || !['text', 'email', 'tel'].includes(f.type) || typeof f.required !== 'boolean' || !Number.isInteger(f.maxLength) || f.maxLength < 1) fail(`${q.id}: invalid field configuration.`);
    } else if (!['text', 'long-text', 'email', 'tel'].includes(q.type) || !('maxLength' in q) || !Number.isInteger(q.maxLength) || q.maxLength < 1) fail(`${q.id}: unsupported question type or invalid maximum length.`);
  });
  function condition(c: unknown, owner: string, before = Infinity): void {
    if (!record(c)) fail(`${owner}: invalid condition.`);
    const v = c as Record<string, unknown>;
    const groups = ['all', 'any', 'not'].filter(k => k in v);
    if (groups.length) {
      if (groups.length !== 1 || 'questionId' in v) fail(`${owner}: ambiguous condition.`);
      if (groups[0] === 'not') { condition(v.not, owner, before); return; }
      const children = v[groups[0]];
      if (!Array.isArray(children) || !children.length) fail(`${owner}: empty condition group.`);
      for (const child of children as unknown[]) condition(child, owner, before);
      return;
    }
    if (typeof v.questionId !== 'string' || !ids.has(v.questionId)) fail(`${owner}: missing referenced question ${v.questionId}.`);
    const ref = String(v.questionId);
    if (ids.get(ref)! >= before) fail(`${owner}: cyclic/forward dependency on ${ref}; dependencies must precede the question.`);
    if (!['equals', 'notEquals', 'includes', 'includesAny', 'includesAll', 'exists'].includes(String(v.operator))) fail(`${owner}: invalid condition operator ${v.operator}.`);
    if (v.operator === 'exists') return;
    const q = def.questions[ids.get(ref)!];
    const listOperator = v.operator === 'includesAny' || v.operator === 'includesAll';
    if (listOperator ? !Array.isArray(v.value) || !v.value.length || !v.value.every(s => typeof s === 'string') : typeof v.value !== 'string') fail(`${owner}: invalid condition value.`);
    if (String(v.operator).startsWith('includes') && q.type !== 'multi') fail(`${owner}: includes requires a multi-select reference.`);
    if (['equals', 'notEquals'].includes(String(v.operator)) && q.type === 'multi') fail(`${owner}: compare multi-selects with includes.`);
    for (const item of Array.isArray(v.value) ? v.value : [v.value]) if ('options' in q && !q.options.some(o => o.value === item)) fail(`${owner}: referenced option ${item} no longer exists in ${q.id}.`);
  }
  for (const [index, q] of def.questions.entries()) {
    if (q.visibleWhen) condition(q.visibleWhen, q.id, index);
    if (q.inlineAfter && (ids.get(q.inlineAfter) !== index - 1 || def.questions[index - 1].inlineAfter)) fail(`${q.id}: inline follow-up must immediately follow a screen question.`);
    for (const ref of Object.values(q.interpolate ?? {})) if (!ids.has(ref.questionId) || ids.get(ref.questionId)! >= index) fail(`${q.id}: invalid interpolation reference.`);
  }
  if (def.terminal !== 'review' || !def.questions.length || def.questions[0].visibleWhen || !def.questions.some(q => q.type === 'contact' && q.required && !q.visibleWhen)) fail('missing terminal path: an unconditional entry, required contact and review are required.');
  if (new Set(def.destinations).size !== def.destinations.length || def.destinations.some(v => typeof v !== 'string' || !v) || !record(def.fallback) || !def.destinations.includes(def.fallback.destination) || typeof def.fallback.category !== 'string') fail('invalid fallback routing destination.');
  const ruleIds = new Set<string>();
  for (const rule of def.routing) {
    if (!record(rule) || typeof rule.id !== 'string' || ruleIds.has(rule.id) || !Number.isFinite(rule.priority) || !def.destinations.includes(rule.destination) || typeof rule.category !== 'string') fail('invalid routing target, duplicate rule ID, or priority.');
    ruleIds.add(rule.id); condition(rule.when, rule.id);
  }
  // Exhaust only dependency domains for each question, not every whole-flow
  // answer combination. Reject impossible branches at publication time.
  for (const q of def.questions) {
    const refs = new Set(conditionReferences(q.visibleWhen));
    for (const id of refs) for (const ancestor of conditionReferences(def.questions[ids.get(id)!].visibleWhen)) refs.add(ancestor);
    const dependencies = def.questions.filter(dep => refs.has(dep.id));
    let attempts = 0;
    function possible(index: number, answers: Answers): boolean {
      if (++attempts > 100000) fail(`${q.id}: condition is too complex to validate safely.`);
      if (index === dependencies.length) return resolveVisibleQuestions(def, answers).some(v => v.id === q.id);
      const dep = dependencies[index];
      if (!evaluateCondition(dep.visibleWhen, answers)) return possible(index + 1, answers);
      const domain = (question: Question): Answers[string][] => {
        if (question.type === 'single') return [...(!question.required ? [''] : []), ...question.options.map(o => o.value)];
        if (question.type === 'multi') {
          if (question.options.length > 12) fail(`${question.id}: multi-select dependency has too many values to validate.`);
          return Array.from({ length: 2 ** question.options.length }, (_, mask) => question.options.filter((_, i) => mask & (1 << i)).map(o => o.value)).filter(v => v.length >= question.min || (!question.required && v.length === 0));
        }
        return [...new Set(['example', ...(!question.required ? [''] : []), ...def.questions.flatMap(q => conditionValues(q.visibleWhen, question.id))])];
      };
      return domain(dep).some(answer => possible(index + 1, { ...answers, [dep.id]: answer }));
    }
    if (!possible(0, {})) fail(`${q.id}: unreachable question / impossible dependency.`);
  }
}
