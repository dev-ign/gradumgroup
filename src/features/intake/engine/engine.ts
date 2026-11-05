import { intakeTranslations } from '../../../i18n/intake';
import type { Answer, Answers, Condition, FlowState, IntakeDefinition, Locale, Localized, Question, Source } from '../config/types';
import { sources } from '../config/types';

export const localize = (text: Localized, locale: Locale) => text[locale];
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g, (_, key: string) => values[key] ?? '');
}
export function evaluateCondition(condition: Condition | undefined, answers: Answers): boolean {
  if (!condition) return true;
  if ('all' in condition) return condition.all.every(c => evaluateCondition(c, answers));
  if ('any' in condition) return condition.any.some(c => evaluateCondition(c, answers));
  if ('not' in condition) return !evaluateCondition(condition.not, answers);
  const answer = answers[condition.questionId];
  switch (condition.operator) {
    case 'exists': return typeof answer === 'string' ? answer.trim().length > 0 : Array.isArray(answer) ? answer.length > 0 : !!answer;
    case 'equals': return answer === condition.value;
    case 'notEquals': return answer !== undefined && answer !== condition.value;
    case 'includes': return Array.isArray(answer) && typeof condition.value === 'string' && answer.includes(condition.value);
    case 'includesAny': return Array.isArray(answer) && Array.isArray(condition.value) && condition.value.some(v => answer.includes(v));
    case 'includesAll': return Array.isArray(answer) && Array.isArray(condition.value) && condition.value.every(v => answer.includes(v));
    default: return false;
  }
}
// Evaluate against active predecessors only: stale answers on hidden branches
// cannot make a downstream question visible, even under a negated condition.
export function resolveVisibleQuestions(def: IntakeDefinition, answers: Answers): Question[] {
  const active: Answers = {};
  return def.questions.filter(q => {
    if (!evaluateCondition(q.visibleWhen, active)) return false;
    if (answers[q.id] !== undefined) active[q.id] = answers[q.id];
    return true;
  });
}
export const resolveScreens = (def: IntakeDefinition, answers: Answers) => resolveVisibleQuestions(def, answers).filter(q => !q.inlineAfter);
export function resolveNextQuestion(def: IntakeDefinition, answers: Answers, current?: string): string {
  const screens = resolveScreens(def, answers);
  if (!current) return screens[0]?.id ?? 'review';
  return screens[screens.findIndex(q => q.id === current) + 1]?.id ?? 'review';
}
export function activeAnswers(def: IntakeDefinition, answers: Answers): Answers {
  return Object.fromEntries(resolveVisibleQuestions(def, answers).filter(q => answers[q.id] !== undefined).map(q => [q.id, answers[q.id]]));
}
export function reconcileVisited(def: IntakeDefinition, answers: Answers, visited: string[]): string[] {
  const visible = new Set([...resolveScreens(def, answers).map(q => q.id), 'review']);
  return [...new Set(visited)].filter(id => visible.has(id));
}
export const resolvePreviousQuestion = (visited: string[]) => visited.at(-2);
export function optionLabel(def: IntakeDefinition, questionId: string, answer: Answer | undefined, locale: Locale): string {
  const q = def.questions.find(q => q.id === questionId);
  if (!q || answer === undefined) return '';
  if ('options' in q) {
    const values = Array.isArray(answer) ? answer : [answer];
    return values.map(v => q.options.find(o => o.value === v)?.label[locale] ?? '').filter(Boolean).join(', ');
  }
  return typeof answer === 'string' ? answer : Object.values(answer).join(' · ');
}
export function questionTitle(def: IntakeDefinition, q: Question, answers: Answers, locale: Locale): string {
  const active = activeAnswers(def, answers);
  const values: Record<string, string> = {};
  for (const [variable, ref] of Object.entries(q.interpolate ?? {})) {
    let label = optionLabel(def, ref.questionId, active[ref.questionId], locale);
    if (ref.format === 'practice') {
      if (active[ref.questionId] === 'other') label = String(active[`${ref.questionId}_other_text`] ?? '');
      else if (label) label = interpolate(intakeTranslations[locale].engineeringPractice, { specialty: label.toLocaleLowerCase(locale) });
      else label = intakeTranslations[locale].generalPractice;
    }
    values[variable] = label;
  }
  return interpolate(q.title[locale], values);
}
export function resolveReview(def: IntakeDefinition, answers: Answers, locale: Locale) {
  const groups = new Map<string, { id: string; label: string; editQuestionId: string; values: string[] }>();
  for (const q of resolveVisibleQuestions(def, answers)) {
    const value = optionLabel(def, q.id, answers[q.id], locale);
    if (!value.trim()) continue;
    const id = q.reviewGroup ?? q.id;
    const group = groups.get(id) ?? { id, label: q.reviewLabel[locale], editQuestionId: q.inlineAfter ?? q.id, values: [] };
    if (q.type === 'contact' && answers[q.id] && typeof answers[q.id] === 'object' && !Array.isArray(answers[q.id])) {
      const contact = answers[q.id] as Record<string, string>;
      const values = q.fields.map(field => contact[field.id]).filter(Boolean);
      group.values.push(values[0], values.slice(1).join(' · '));
    } else group.values.push(value);
    groups.set(id, group);
  }
  return [...groups.values()];
}
export type Errors = Record<string, string>;
export function validateAnswer(q: Question, answer: Answer | undefined, locale: Locale): Errors {
  const c = intakeTranslations[locale];
  if (!q.required && (answer === undefined || answer === '' || (Array.isArray(answer) && !answer.length))) return {};
  if (q.type === 'contact') {
    const fields = answer && typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
    const errors: Errors = {};
    for (const field of q.fields) {
      const value = fields[field.id]?.trim() ?? '';
      if (!value && !field.required) continue;
      if (value.length > field.maxLength) errors[field.id] = interpolate(c.lengthError, { max: String(field.maxLength) });
      else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field.id] = c.emailError;
      else if (field.type === 'tel' && (!/^\+?[\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) errors[field.id] = c.phoneError;
      else if (!value) errors[field.id] = c.nameError;
    }
    return errors;
  }
  if (q.type === 'single') return typeof answer === 'string' && q.options.some(o => o.value === answer) ? {} : { [q.id]: c.chooseError };
  if (q.type === 'multi') return Array.isArray(answer) && answer.length >= q.min && new Set(answer).size === answer.length && answer.every(v => q.options.some(o => o.value === v)) ? {} : { [q.id]: q.selectAll ? c.regionsError : c.interestsError };
  if (answer === undefined || answer === '') return q.required ? { [q.id]: c.textError } : {};
  if (typeof answer !== 'string' || (!answer.trim() && q.required)) return { [q.id]: c.textError };
  if (answer.length > q.maxLength) return { [q.id]: interpolate(c.lengthError, { max: String(q.maxLength) }) };
  if (q.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer)) return { [q.id]: c.emailError };
  if (q.type === 'tel' && !/^\+?[\d\s().-]{7,60}$/.test(answer)) return { [q.id]: c.phoneError };
  return {};
}
export function toggleMulti(q: Extract<Question, { type: 'multi' }>, previous: string[], value: string): string[] {
  const next = new Set(previous);
  const removing = next.has(value);
  if (removing) next.delete(value); else next.add(value);
  if (q.selectAll) {
    if (value === q.selectAll.value) for (const member of q.selectAll.members) { if (removing) next.delete(member); else next.add(member); }
    if (q.selectAll.members.every(v => next.has(v))) next.add(q.selectAll.value); else next.delete(q.selectAll.value);
  }
  return q.options.filter(o => next.has(o.value)).map(o => o.value);
}
export function resolveRouting(def: IntakeDefinition, answers: Answers) {
  const active = activeAnswers(def, answers);
  const rule = [...def.routing].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id, 'en')).find(r => evaluateCondition(r.when, active));
  return { destinationTeamId: rule?.destination ?? def.fallback.destination, category: rule?.category ?? def.fallback.category, matchedRuleId: rule?.id ?? null, flowVersion: def.version, fallback: !rule };
}
export const validateSource = (value: string | null): Source => sources.find(source => source === value) ?? 'direct';
export function initialState(def: IntakeDefinition, source: Source, locale: Locale): FlowState {
  const current = resolveNextQuestion(def, {});
  return { current, answers: {}, visited: [current], seen: [current], editing: false, source, locale, consent: false, revisiting: false };
}
export function updateAnswer(def: IntakeDefinition, state: FlowState, id: string, answer: Answer): FlowState {
  const answers = { ...state.answers, [id]: answer };
  return { ...state, answers, consent: false, visited: reconcileVisited(def, answers, state.visited) };
}
export function advance(def: IntakeDefinition, state: FlowState): FlowState {
  let current = resolveNextQuestion(def, state.answers, state.current);
  if (state.editing) current = resolveScreens(def, state.answers).find(q => Object.keys(validateAnswer(q, state.answers[q.id], state.locale)).length || resolveVisibleQuestions(def, state.answers).some(child => child.inlineAfter === q.id && Object.keys(validateAnswer(child, state.answers[child.id], state.locale)).length))?.id ?? 'review';
  const prior = state.visited.slice(0, state.visited.indexOf(state.current) + 1);
  const visited = state.editing && current === 'review' ? [...resolveScreens(def, state.answers).map(q => q.id), 'review'] : [...prior.filter(id => id !== current), current];
  return { ...state, current, visited, seen: [...new Set([...state.seen, current])], editing: state.editing && current !== 'review', revisiting: state.answers[current] !== undefined };
}
export function resolveSubmission(def: IntakeDefinition, state: FlowState, timestamp: string) {
  if (!state.consent) throw new Error('Consent is required');
  for (const q of resolveVisibleQuestions(def, state.answers)) if (Object.keys(validateAnswer(q, state.answers[q.id], state.locale)).length) throw new Error(`Answer required: ${q.id}`);
  const answers = activeAnswers(def, state.answers);
  return { flowId: def.id, flowVersion: def.version, relationship: answers.q01_relationship, answers, visitedPath: reconcileVisited(def, state.answers, state.visited), locale: state.locale, source: state.source, submittedAt: timestamp, consent: { inquiry: true, at: timestamp, copyVersion: def.version, locale: state.locale }, routing: resolveRouting(def, answers) };
}
export type Submission = ReturnType<typeof resolveSubmission>;
