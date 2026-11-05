import { expect, test } from '@playwright/test';
import { intakeDefinition as def } from '../src/features/intake/config/definition';
import type { Answers, Condition, IntakeDefinition } from '../src/features/intake/config/types';
import { activeAnswers, advance, evaluateCondition, initialState, interpolate, questionTitle, reconcileVisited, resolveNextQuestion, resolvePreviousQuestion, resolveRouting, resolveScreens, resolveSubmission, resolveVisibleQuestions, toggleMulti, updateAnswer, validateAnswer, validateSource } from '../src/features/intake/engine/engine';
import { assertDefinition } from '../src/features/intake/engine/schema';
import { restoreDraft, RETENTION_MS, serializeDraft } from '../src/features/intake/services/persistence';
import { createMockSubmission } from '../src/features/intake/services/submission';
import { track } from '../src/features/intake/services/analytics';
import { flowReducer } from '../src/features/intake/hooks/useIntakeFlow';

const question = (id: string) => def.questions.find(q => q.id === id)!;
const partner = (category = 'engineering'): Answers => ({ q01_relationship: 'partner', q02_work_category: category });
const completeAnswers: Answers = { ...partner(), q03_engineering_specialty: 'civil', q04_experience_years: 'more_than_10', q05_coverage: ['north'], q06_project_interests: ['commercial'], q07_availability: 'now', q08_contact: { name: 'María Test', email: 'maria@example.com', phone: '+1 809 555 0142' } };
const completeState = () => ({ ...initialState(def, 'homepage', 'en'), current: 'review', answers: { ...completeAnswers }, visited: [...resolveScreens(def, completeAnswers).map(q => q.id), 'review'], consent: true });

test('published definition passes integrity checks and resolves initial question', () => {
  expect(() => assertDefinition(def)).not.toThrow();
  expect(resolveNextQuestion(def, {})).toBe('q01_relationship');
});
test('client path contains only need, contact and shared relationship', () => {
  expect(resolveScreens(def, { q01_relationship: 'client' }).map(q => q.id)).toEqual(['q01_relationship', 'c01_client_need', 'q08_contact']);
});
for (const [category, ids] of Object.entries({ engineering: ['q03_engineering_specialty'], architecture: ['q03_architecture_focus'], construction: ['q03_construction_trade', 'q03_construction_crew_size'], project_management: ['q03_pm_scope'], business_services: ['q03_services_area'], other: ['q03_other_description'] })) {
  test(`${category} visits only its own qualification questions`, () => {
    expect(resolveScreens(def, partner(category)).filter(q => q.id.startsWith('q03')).map(q => q.id)).toEqual(ids);
    expect(resolveNextQuestion(def, partner(category), 'q02_work_category')).toBe(ids[0]);
  });
}
test('Other specialty requires an inline response and suppresses progression without it', () => {
  const answers = { ...partner(), q03_engineering_specialty: 'other' };
  expect(resolveVisibleQuestions(def, answers).map(q => q.id)).toContain('q03_engineering_specialty_other_text');
  const state = { ...initialState(def, 'direct', 'en'), current: 'q03_engineering_specialty', answers };
  expect(flowReducer(def, state, { type: 'next', expected: state.current })).toBe(state);
  expect(validateAnswer(question('q03_engineering_specialty_other_text'), '', 'en')).not.toEqual({});
});
test('other project detail is conditional, optional and excluded when deselected', () => {
  const answers = { ...partner(), q06_project_interests: ['commercial', 'other'], q06a_other_detail: 'Water systems' };
  expect(activeAnswers(def, answers).q06a_other_detail).toBe('Water systems');
  expect(validateAnswer(question('q06a_other_detail'), undefined, 'en')).toEqual({});
  expect(activeAnswers(def, { ...answers, q06_project_interests: ['commercial'] })).not.toHaveProperty('q06a_other_detail');
});
test('all condition operators are declarative and fail safely', () => {
  const answers: Answers = { x: 'a', y: ['a', 'b'] };
  const conditions: Condition[] = [{ questionId: 'x', operator: 'equals', value: 'a' }, { questionId: 'x', operator: 'notEquals', value: 'b' }, { questionId: 'x', operator: 'exists' }, { questionId: 'y', operator: 'includes', value: 'b' }, { questionId: 'y', operator: 'includesAny', value: ['c', 'a'] }, { questionId: 'y', operator: 'includesAll', value: ['a', 'b'] }, { not: { questionId: 'x', operator: 'equals', value: 'b' } }];
  expect(evaluateCondition({ all: conditions }, answers)).toBe(true);
  expect(evaluateCondition({ any: [{ questionId: 'missing', operator: 'exists' }, conditions[0]] }, answers)).toBe(true);
  expect(evaluateCondition({ questionId: 'missing', operator: 'notEquals', value: 'a' }, answers)).toBe(false);
});
test('Back follows visited screens; upstream edits retain inactive answers in memory', () => {
  let state = { ...initialState(def, 'direct', 'en'), answers: { ...completeAnswers }, current: 'q04_experience_years', visited: ['q01_relationship', 'q02_work_category', 'q03_engineering_specialty', 'q04_experience_years'] };
  expect(resolvePreviousQuestion(state.visited)).toBe('q03_engineering_specialty');
  state = updateAnswer(def, state, 'q02_work_category', 'architecture');
  expect(state.visited).not.toContain('q03_engineering_specialty');
  expect(state.answers.q03_engineering_specialty).toBe('civil');
  expect(activeAnswers(def, state.answers)).not.toHaveProperty('q03_engineering_specialty');
  state = updateAnswer(def, state, 'q02_work_category', 'engineering');
  expect(activeAnswers(def, state.answers).q03_engineering_specialty).toBe('civil');
  expect(reconcileVisited(def, partner('architecture'), ['q01_relationship', 'q03_engineering_specialty'])).toEqual(['q01_relationship']);
});
test('hidden branch answers cannot activate descendants', () => {
  const answers = { q01_relationship: 'client', q02_work_category: 'engineering', q03_engineering_specialty: 'other' };
  expect(resolveVisibleQuestions(def, answers).some(q => q.id.startsWith('q03'))).toBe(false);
});
test('review and payload omit inactive answers and preserve synthetic contact', () => {
  const state = completeState();
  state.answers.q03_architecture_focus = 'Residential';
  const payload = resolveSubmission(def, state, '2026-11-04T21:00:00.000Z');
  expect(payload.answers).not.toHaveProperty('q03_architecture_focus');
  expect(payload.routing.category).toBe('engineering_partnership');
  expect(payload.answers.q08_contact).toEqual(completeAnswers.q08_contact);
  expect(() => resolveSubmission(def, { ...state, consent: false }, '')).toThrow('Consent');
});
test('review edit reaches newly required branch before returning to review', () => {
  let state = flowReducer(def, completeState(), { type: 'edit', id: 'q02_work_category' });
  state = updateAnswer(def, state, 'q02_work_category', 'architecture');
  state = advance(def, state);
  expect(state.current).toBe('q03_architecture_focus');
  state = updateAnswer(def, state, state.current, 'Residential');
  expect(advance(def, state).current).toBe('review');
});
test('field validation permits international names and rejects malformed email/phone', () => {
  expect(validateAnswer(question('q08_contact'), completeAnswers.q08_contact, 'en')).toEqual({});
  expect(validateAnswer(question('q08_contact'), { name: '李', email: 'bad', phone: 'abc' }, 'en')).toHaveProperty('email');
  expect(validateAnswer(question('q08_contact'), { name: '李', email: 'li@example.jp', phone: '+81 90 1234 5678' }, 'en')).toEqual({});
  expect(validateAnswer(question('q05_coverage'), [], 'en')).toHaveProperty('q05_coverage');
  expect(validateAnswer(question('q03_architecture_focus'), 'x'.repeat(201), 'es')).toHaveProperty('q03_architecture_focus');
});
test('safe localized interpolation uses active approved answer labels', () => {
  expect(questionTitle(def, question('q04_experience_years'), completeAnswers, 'en')).toContain('civil engineering');
  expect(questionTitle(def, question('q04_experience_years'), completeAnswers, 'es')).toContain('ingeniería civil');
  expect(questionTitle(def, question('q04_experience_years'), partner('architecture'), 'en')).toContain('your field');
  expect(interpolate('{name} {unknown}', { name: '<script>' })).toBe('<script> ');
});
test('optional input types can be skipped and text-based conditions validate real values', () => {
  expect(validateAnswer({ ...question('q01_relationship'), required: false }, undefined, 'en')).toEqual({});
  expect(validateAnswer({ ...question('q05_coverage'), required: false }, [], 'en')).toEqual({});
  const changed = structuredClone(def);
  const index = changed.questions.findIndex(q => q.id === 'q03_architecture_focus');
  changed.questions.splice(index + 1, 0, { ...changed.questions[index], id: 'q03_architecture_followup', analyticsId: 'q03_architecture_followup', visibleWhen: { questionId: 'q03_architecture_focus', operator: 'equals', value: 'Residential' } });
  expect(() => assertDefinition(changed)).not.toThrow();
});
test('Nationwide selects only local regions; deselection reconciles the shortcut', () => {
  const q = question('q05_coverage');
  if (q.type !== 'multi') throw new Error('Expected multi');
  const values = toggleMulti(q, [], 'nationwide');
  expect(values).toHaveLength(5); expect(values).not.toContain('outside_dr');
  expect(toggleMulti(q, values, 'east')).not.toContain('nationwide');
  expect(toggleMulti(q, values, 'nationwide')).toEqual([]);
});
test('routing priority, stable tie-break and explicit fallback', () => {
  expect(resolveRouting(def, {})).toMatchObject({ fallback: true, destinationTeamId: 'mock:general' });
  const rules = [{ ...def.routing[0], id: 'z', priority: 200 }, { ...def.routing[0], id: 'a', priority: 200 }];
  expect(resolveRouting({ ...def, routing: rules }, { q01_relationship: 'client', c01_client_need: 'consulting' }).matchedRuleId).toBe('a');
});
test('drafts expire and omit contact, consent, inactive answers and unknown source', () => {
  const now = Date.now();
  const serialized = serializeDraft(def, completeState(), now);
  expect(serialized).not.toContain('maria@example.com'); expect(serialized).not.toContain('consent');
  expect(restoreDraft(def, serialized, now)?.current).toBe('q08_contact');
  expect(restoreDraft(def, serialized, now + RETENTION_MS + 1)).toBeNull();
  expect(restoreDraft(def, '{bad')).toBeNull();
  expect(restoreDraft(def, serialized.replace('1.0.0', '0.0.1'), now)).toBeNull();
  expect(validateSource('https://example.com')).toBe('direct');
});
for (const [name, mutate] of Object.entries<(d: IntakeDefinition) => void>({
  duplicate: d => { d.questions.push(d.questions[0]); },
  missingReference: d => { d.questions[1].visibleWhen = { questionId: 'gone', operator: 'exists' }; },
  missingOption: d => { d.questions[1].visibleWhen = { questionId: 'q01_relationship', operator: 'equals', value: 'gone' }; },
  cyclic: d => { d.questions[1].visibleWhen = { questionId: d.questions[1].id, operator: 'exists' }; },
  unreachable: d => { d.questions[1].visibleWhen = { all: [{ questionId: 'q01_relationship', operator: 'equals', value: 'client' }, { questionId: 'q01_relationship', operator: 'equals', value: 'partner' }] }; },
  routing: d => { d.fallback.destination = 'unknown'; },
  terminal: d => { d.terminal = 'missing' as 'review'; },
  optionDuplicate: d => { const q = d.questions[0]; if (q.type === 'single') q.options.push(q.options[0]); },
  operator: d => { d.questions[1].visibleWhen = { questionId: 'q01_relationship', operator: 'eval' as 'exists' }; },
})) {
  test(`invalid configuration rejects ${name}`, () => { const changed = structuredClone(def); mutate(changed); expect(() => assertDefinition(changed)).toThrow('Intake definition:'); });
}
test('mock transport fails once, retries and deduplicates success', async () => {
  const adapter = createMockSubmission({ failures: 1, delay: 1 });
  const options = { signal: new AbortController().signal, idempotencyKey: 'test' };
  const payload = resolveSubmission(def, completeState(), '2026-11-04T21:00:00Z');
  await expect(adapter.submit(payload, options)).rejects.toThrow('Simulated');
  const result = await adapter.submit(payload, options);
  expect(result.mode).toBe('mock'); expect(await adapter.submit(payload, options)).toEqual(result);
});
test('analytics drops fields outside its metadata allowlist', () => {
  let recorded: unknown;
  track({ track: (_, data) => { recorded = data; } }, 'question_answered', { flowVersion: def.version, source: 'direct', locale: 'en', email: 'secret@example.com' } as Parameters<typeof track>[2]);
  expect(recorded).not.toHaveProperty('email');
});
