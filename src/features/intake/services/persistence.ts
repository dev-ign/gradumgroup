import type { FlowState, IntakeDefinition } from '../config/types';
import { activeAnswers, initialState, reconcileVisited, resolveScreens, validateAnswer, validateSource } from '../engine/engine';

export const DRAFT_KEY = 'gradum:intake:draft:v1';
export const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
export function serializeDraft(def: IntakeDefinition, state: FlowState, now = Date.now()): string {
  const answers = Object.fromEntries(Object.entries(activeAnswers(def, state.answers)).filter(([id]) => def.questions.find(q => q.id === id)?.type !== 'contact'));
  return JSON.stringify({ version: def.version, updatedAt: now, answers, current: state.current, visited: state.visited, source: state.source, locale: state.locale });
}
export function restoreDraft(def: IntakeDefinition, serialized: string | null, now = Date.now()): FlowState | null {
  try {
    if (!serialized || serialized.length > 100000) return null;
    const raw: unknown = JSON.parse(serialized);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const draft = raw as Record<string, unknown>;
    if (draft.version !== def.version || typeof draft.updatedAt !== 'number' || draft.updatedAt > now || now - draft.updatedAt > RETENTION_MS || !draft.answers || typeof draft.answers !== 'object' || Array.isArray(draft.answers)) return null;
    const locale = draft.locale === 'es' ? 'es' : 'en';
    const state = initialState(def, validateSource(typeof draft.source === 'string' ? draft.source : null), locale);
    for (const q of def.questions) {
      const value: unknown = (draft.answers as Record<string, unknown>)[q.id];
      if (q.type === 'contact' || value === undefined) continue;
      if ((typeof value === 'string' || (Array.isArray(value) && value.every(v => typeof v === 'string'))) && !Object.keys(validateAnswer(q, value, locale)).length) state.answers[q.id] = value;
    }
    state.answers = activeAnswers(def, state.answers);
    if (!Object.keys(state.answers).length) return null;
    const screens = resolveScreens(def, state.answers);
    // Resume before the first missing/invalid answer, including deliberately
    // omitted contact information; never allow an unvalidated saved Review.
    const firstMissing = screens.find(q => Object.keys(validateAnswer(q, state.answers[q.id], locale)).length);
    const saved = screens.find(q => q.id === draft.current);
    state.current = saved && (!firstMissing || screens.indexOf(saved) <= screens.indexOf(firstMissing)) ? saved.id : firstMissing?.id ?? screens[0].id;
    const path = Array.isArray(draft.visited) ? draft.visited.filter((v): v is string => typeof v === 'string') : [];
    state.visited = reconcileVisited(def, state.answers, path).filter(id => screens.findIndex(q => q.id === id) < screens.findIndex(q => q.id === state.current));
    state.visited.push(state.current);
    state.seen = [...state.visited];
    return state;
  } catch { return null; }
}
export function readDraft(def: IntakeDefinition): FlowState | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    const state = restoreDraft(def, raw);
    if (raw && !state) localStorage.removeItem(DRAFT_KEY);
    return state;
  } catch { return null; }
}
