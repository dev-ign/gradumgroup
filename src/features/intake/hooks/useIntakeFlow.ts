import { useEffect, useReducer, useRef, useState } from 'react';
import type { Answer, FlowState, IntakeDefinition, Locale, Source } from '../config/types';
import { advance, initialState, resolvePreviousQuestion, resolveVisibleQuestions, updateAnswer, validateAnswer } from '../engine/engine';
import { DRAFT_KEY, readDraft, serializeDraft } from '../services/persistence';
import { noOpAnalytics, track } from '../services/analytics';

type Action = { type: 'answer'; id: string; answer: Answer } | { type: 'next'; expected: string } | { type: 'back' } | { type: 'edit'; id: string } | { type: 'replace'; state: FlowState } | { type: 'consent'; value: boolean } | { type: 'locale'; locale: Locale };
export function flowReducer(def: IntakeDefinition, state: FlowState, action: Action): FlowState {
  switch (action.type) {
    case 'answer': return updateAnswer(def, state, action.id, action.answer);
    case 'next': {
      if (action.expected !== state.current) return state;
      const questions = resolveVisibleQuestions(def, state.answers).filter(q => q.id === state.current || q.inlineAfter === state.current);
      if (questions.some(q => Object.keys(validateAnswer(q, state.answers[q.id], state.locale)).length)) return state;
      return advance(def, state);
    }
    case 'back': {
      const previous = resolvePreviousQuestion(state.visited);
      return previous ? { ...state, current: previous, visited: state.visited.slice(0, -1), editing: false, revisiting: true } : state;
    }
    case 'edit': {
      const index = state.visited.indexOf(action.id);
      return { ...state, current: action.id, visited: index >= 0 ? state.visited.slice(0, index + 1) : [...state.visited.filter(v => v !== 'review'), action.id], editing: true, revisiting: true };
    }
    case 'replace': return action.state;
    case 'consent': return { ...state, consent: action.value };
    case 'locale': return { ...state, locale: action.locale };
  }
}
export function useIntakeFlow(def: IntakeDefinition, source: Source, locale: Locale) {
  const [state, dispatch] = useReducer((s: FlowState, action: Action) => flowReducer(def, s, action), undefined, () => initialState(def, source, locale));
  const [draft, setDraft] = useState(() => readDraft(def));
  const [storageError, setStorageError] = useState(false);
  const [finished, setFinished] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [manual, setManual] = useState(false);
  const viewed = useRef('');
  const started = useRef(false);
  const metadata = () => ({ flowVersion: def.version, source: state.source, locale: state.locale, questionId: state.current, stage: def.questions.find(q => q.id === state.current)?.stage ?? 'review', relationship: state.answers.q01_relationship === 'client' ? 'client' as const : state.answers.q01_relationship === 'partner' ? 'partner' as const : undefined });
  const emit = (event: Parameters<typeof track>[1]) => track(noOpAnalytics, event, metadata());

  function cancelAuto() {
    clearTimeout(timer.current);
    timer.current = undefined;
    setPending(false);
    setManual(true);
  }
  function answer(id: string, value: Answer, autoDelay?: number) {
    clearTimeout(timer.current);
    setPending(false);
    dispatch({ type: 'answer', id, answer: value });
    emit('question_answered');
    if (autoDelay !== undefined && !state.revisiting && !state.editing && !manual) {
      setPending(true);
      timer.current = setTimeout(() => { setPending(false); dispatch({ type: 'next', expected: state.current }); }, autoDelay);
    }
  }
  function navigate(action: Action) { cancelAuto(); setManual(false); dispatch(action); }
  function resume() {
    if (!draft) return;
    dispatch({ type: 'replace', state: { ...draft, locale, revisiting: true } });
    setDraft(null); emit('intake_resumed');
  }
  function restart() {
    try { localStorage.removeItem(DRAFT_KEY); } catch { setStorageError(true); }
    dispatch({ type: 'replace', state: initialState(def, source, locale) });
    setManual(false); setDraft(null);
  }
  function save(): boolean {
    if (!Object.keys(state.answers).length) return true;
    try { localStorage.setItem(DRAFT_KEY, serializeDraft(def, state)); return true; }
    catch { setStorageError(true); return false; }
  }
  function complete() {
    cancelAuto(); setFinished(true);
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* The draft contains no contact data. */ }
    emit('intake_submitted');
  }
  useEffect(() => {
    if (state.locale !== locale) dispatch({ type: 'locale', locale });
  }, [locale, state.locale]);
  useEffect(() => {
    // The persisted draft never contains contact fields or consent.
    if (draft || finished || !Object.keys(state.answers).length) return;
    let canceled = false;
    queueMicrotask(() => {
      if (canceled) return;
      try { localStorage.setItem(DRAFT_KEY, serializeDraft(def, state)); }
      catch { setStorageError(true); }
    });
    return () => { canceled = true; };
  }, [def, state, draft, finished]);
  useEffect(() => {
    if (draft || finished) return;
    const metadata = { flowVersion: def.version, source: state.source, locale: state.locale, questionId: state.current, stage: def.questions.find(q => q.id === state.current)?.stage ?? 'review' };
    if (!started.current) { started.current = true; track(noOpAnalytics, 'intake_started', metadata); }
    if (viewed.current !== state.current) {
      viewed.current = state.current;
      track(noOpAnalytics, state.current === 'review' ? 'intake_reviewed' : 'question_viewed', metadata);
    }
  }, [def, state, draft, finished]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return { state, dispatch, draft, storageError, finished, pending, manual, revisiting: state.revisiting, answer, navigate, cancelAuto, resume, restart, save, complete, emit };
}
