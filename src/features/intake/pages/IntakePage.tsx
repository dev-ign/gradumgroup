import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from '../../../i18n/useTranslation';
import { Button } from '../../../components/ui/Button';
import { motionTokens } from '../../../motion/presets';
import type { IntakeDefinition, Question } from '../config/types';
import { activeAnswers, evaluateCondition, interpolate, optionLabel, questionTitle, resolveReview, resolveSubmission, resolveVisibleQuestions, toggleMulti, validateAnswer, validateSource, type Errors } from '../engine/engine';
import { localIntakeProvider } from '../providers/content';
import { createMockSubmission } from '../services/submission';
import { useIntakeFlow } from '../hooks/useIntakeFlow';
import { AnswerChoices, IntakeActions, IntakeDialog, IntakeHeader, IntakeIcon, IntakeTextField } from '../components/IntakeControls';
import '../intake.css';

const definitionPromise = localIntakeProvider.getPublishedDefinition('en');

function StepPanel({ children, back, reduced, onSubmit, onKeyDown }: { children: ReactNode; back: boolean; reduced: boolean; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onKeyDown: React.KeyboardEventHandler<HTMLFormElement> }) {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    ref.current?.querySelector<HTMLHeadingElement>('h1')?.focus({ preventScroll: true });
  }, []);
  return <motion.form ref={ref} aria-labelledby="intake-title" noValidate onSubmit={onSubmit} onKeyDown={onKeyDown} initial={{ opacity: 0, y: reduced ? 0 : back ? -10 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : back ? 8 : -8 }} transition={{ duration: reduced ? 0.12 : 0.26, ease: motionTokens.ease }}>{children}</motion.form>;
}

function IntakeExperience({ definition }: { definition: IntakeDefinition }) {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const source = validateSource(new URLSearchParams(location.search).get('source'));
  const flow = useIntakeFlow(definition, source, lang);
  const { state } = flow;
  const reduced = !!useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [exitOpen, setExitOpen] = useState(false);
  const [backwards, setBackwards] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [announcement, setAnnouncement] = useState('');
  const controller = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const submissionKey = useRef(crypto.randomUUID());
  const [submission] = useState(() => createMockSubmission({ failures: import.meta.env.VITE_INTAKE_MOCK_FAILURE === 'once' ? 1 : 0 }));
  const visible = resolveVisibleQuestions(definition, state.answers);
  const question = visible.find(q => q.id === state.current);
  const inline = visible.filter(q => q.inlineAfter === state.current);
  const review = state.current === 'review';
  const stage = review || flow.finished ? 'review' : question?.stage ?? 'about';
  const text = (key: string) => t(`intake.${key}`);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const update = () => {
      const keyboard = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      document.documentElement.style.setProperty('--intake-keyboard', `${keyboard > 120 ? keyboard : 0}px`);
      if (keyboard > 120 && document.activeElement instanceof HTMLElement) document.activeElement.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    };
    viewport.addEventListener('resize', update); viewport.addEventListener('scroll', update);
    return () => { viewport.removeEventListener('resize', update); viewport.removeEventListener('scroll', update); document.documentElement.style.removeProperty('--intake-keyboard'); };
  }, []);

  function exit() {
    flow.cancelAuto();
    if (flow.finished || !Object.keys(state.answers).length) { flow.emit('intake_exited'); navigate('/'); }
    else setExitOpen(true);
  }
  function clearErrors(q: Question, value: Parameters<typeof validateAnswer>[1]) {
    const invalid = validateAnswer(q, value, lang);
    setErrors(previous => Object.fromEntries(Object.entries(previous).filter(([id]) => id in invalid || (id !== q.id && !(q.type === 'contact' && q.fields.some(f => f.id === id))))));
  }
  function focusInvalid(next: Errors) {
    requestAnimationFrame(() => {
      const first = Object.keys(next)[0];
      const field = document.getElementById(first) ?? document.querySelector<HTMLInputElement>(`input[name="${state.current}"]`);
      field?.focus();
    });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    flow.cancelAuto();
    if (busy.current) return;
    if (!review) {
      const next = Object.assign({}, ...[question, ...inline].filter((q): q is Question => !!q).map(q => validateAnswer(q, state.answers[q.id], lang)));
      setErrors(next);
      if (Object.keys(next).length) { focusInvalid(next); return; }
      setBackwards(false); flow.navigate({ type: 'next', expected: state.current }); return;
    }
    const invalid = visible.find(q => Object.keys(validateAnswer(q, state.answers[q.id], lang)).length);
    if (invalid) { flow.navigate({ type: 'edit', id: invalid.inlineAfter ?? invalid.id }); return; }
    if (!state.consent) { setErrors({ consent: text('consentError') }); document.getElementById('intake-consent')?.focus(); return; }
    busy.current = true; setStatus('loading'); setErrors({});
    controller.current = new AbortController();
    try {
      const payload = resolveSubmission(definition, state, new Date().toISOString());
      await submission.submit(payload, { signal: controller.current.signal, idempotencyKey: submissionKey.current });
      flow.complete(); setStatus('idle');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus('error'); flow.emit('intake_submission_failed');
    } finally { busy.current = false; }
  }
  function renderText(q: Question, autoFocus = false) {
    if (q.type === 'single' || q.type === 'multi' || q.type === 'contact') return null;
    return <IntakeTextField key={q.id} id={q.id} label={q.title[lang]} required={q.required} value={typeof state.answers[q.id] === 'string' ? state.answers[q.id] as string : ''} multiline={q.type === 'long-text'} type={q.type === 'email' || q.type === 'tel' ? q.type : 'text'} maxLength={q.maxLength} hint={q.hint?.[lang]} error={errors[q.id]} focus={autoFocus} onChange={value => { flow.answer(q.id, value); clearErrors(q, value); }} onBlur={() => setErrors(previous => ({ ...previous, ...validateAnswer(q, state.answers[q.id], lang) }))} />;
  }
  const canAuto = question?.type === 'single' && question.autoAdvance && !flow.revisiting && !flow.manual && !state.editing && !inline.length;
  const needsContinue = !canAuto || flow.manual;
  const stepNumber = String(state.visited.indexOf(state.current) + 1).padStart(2, '0');
  const active = activeAnswers(definition, state.answers);

  return <div className="intake-page">
    <IntakeHeader definition={definition} locale={lang} stage={stage} done={flow.finished} onExit={exit} />
    <main className={`intake-body ${flow.finished ? 'intake-body--confirmation' : ''}`}>
      <div className="sr-only" role="status" aria-live="polite">{flow.pending ? announcement : flow.finished ? text('demoSuccess') : interpolate(text('questionAnnouncement'), { number: stepNumber, stage: definition.stages.find(s => s.id === stage)!.label[lang] })}</div>
      {flow.finished ? <section className="intake-confirmation">
        <div className="intake-success"><IntakeIcon name="check-success" /></div>
        <h1 tabIndex={-1} ref={element => element?.focus()}>{interpolate(text('successTitle'), { name: typeof active.q08_contact === 'object' && !Array.isArray(active.q08_contact) ? active.q08_contact.name.split(/\s+/)[0] : '' })}</h1>
        <p>{text('successSupport')}</p><p className="intake-notice">{text('demoSuccess')}</p>
        <div className="intake-next"><h2>{text('nextHeading')}</h2><p>{text('plannedSteps')}</p><ol>{(active.q01_relationship === 'client' ? ['clientNextOne', 'clientNextTwo'] : ['nextOne', 'nextTwo', 'nextThree']).map((key, i) => <li key={key}><span>{String(i + 1).padStart(2, '0')}</span>{text(key)}</li>)}</ol></div>
        <Button onClick={() => navigate('/')}>{text('return')}<IntakeIcon name="arrow-right" /></Button>
      </section> : <AnimatePresence mode="wait" initial={false}>
        <StepPanel key={state.current} back={backwards} reduced={reduced} onSubmit={submit} onKeyDown={event => { if (['Tab', 'Escape'].includes(event.key)) flow.cancelAuto(); }}>
          <div className={`intake-question ${question?.type === 'single' ? 'intake-question--single' : ''}`}>
            <div className="intake-eyebrow"><span>{review ? text('review') : stepNumber}</span>{question?.contextFrom && <span className="intake-context"><IntakeIcon name="check-context" />{interpolate(text('because'), { category: optionLabel(definition, question.contextFrom, state.answers[question.contextFrom], lang) })}</span>}</div>
            <h1 id="intake-title" tabIndex={-1}>{review ? text('reviewTitle') : question ? questionTitle(definition, question, state.answers, lang) : ''}</h1>
            {(review || question?.description) && <p className="intake-support"><span className={question?.mobileDescription ? 'intake-desktop-copy' : ''}>{review ? text('reviewSupport') : question?.type === 'contact' && state.answers.q01_relationship === 'client' ? text('clientContactSupport') : question?.description?.[lang]}</span>{question?.mobileDescription && <span className="intake-mobile-copy">{question.mobileDescription[lang]}</span>}</p>}
          </div>
          {review ? <>
            <div className="intake-review">{resolveReview(definition, state.answers, lang).map(group => <div className="intake-review-row" key={group.id}><div><h2>{group.label}</h2><p>{group.values[0]}</p>{group.values.length > 1 && <p className="intake-review-detail">{group.values.slice(1).join(' · ')}</p>}</div><button type="button" onClick={() => { flow.navigate({ type: 'edit', id: group.editQuestionId }); setErrors({}); setBackwards(true); }} aria-label={`${text('edit')} ${group.label}`}>{text('edit')}</button></div>)}</div>
            <label className={`intake-choice intake-consent ${state.consent ? 'is-selected' : ''}`}><input id="intake-consent" type="checkbox" checked={state.consent} onChange={event => { flow.dispatch({ type: 'consent', value: event.target.checked }); setErrors({}); }} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span className="intake-indicator intake-indicator--square">{state.consent && <IntakeIcon name="check-selected" />}</span><span>{text('consent')}</span></label>
            {errors.consent && <p className="intake-error" id="consent-error" role="alert">{errors.consent}</p>}
          </> : question?.type === 'single' || question?.type === 'multi' ? <>
            <AnswerChoices question={question} answer={state.answers[question.id]} locale={lang} error={errors[question.id]} onEnter={() => { setBackwards(false); flow.navigate({ type: 'next', expected: state.current }); }} onChange={value => {
              const selected = question.type === 'multi' ? toggleMulti(question, Array.isArray(state.answers[question.id]) ? state.answers[question.id] as string[] : [], value) : value;
              const followUp = definition.questions.some(q => q.inlineAfter === question.id && evaluateCondition(q.visibleWhen, { ...state.answers, [question.id]: selected }));
              flow.answer(question.id, selected, question.type === 'single' && question.autoAdvance && !followUp ? reduced ? 150 : 450 : undefined);
              clearErrors(question, selected); setBackwards(false);
              setAnnouncement(interpolate(text('selectedNext'), { answer: optionLabel(definition, question.id, selected, lang) }));
            }} />
            {errors[question.id] && <p className="intake-error" id={`${question.id}-error`} role="alert">{errors[question.id]}</p>}
            {question.hint && <p className="intake-field-hint intake-choice-hint">{question.hint[lang]}</p>}
            {inline.map(q => renderText(q, true))}
          </> : question?.type === 'contact' ? <>
            <div className="intake-contact-fields">{question.fields.map(field => {
              const value = state.answers[question.id];
              const contact = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
              return <IntakeTextField key={field.id} id={field.id} label={field.label[lang]} value={contact[field.id] ?? ''} type={field.type} autocomplete={field.autocomplete} required={field.required} maxLength={field.maxLength} hint={field.hint?.[lang]} error={errors[field.id]} onChange={value => { const next = { ...contact, [field.id]: value }; flow.answer(question.id, next); clearErrors(question, next); }} onBlur={() => { const invalid = validateAnswer(question, state.answers[question.id], lang); setErrors(previous => ({ ...previous, [field.id]: invalid[field.id] ?? '' })); }} />;
            })}</div>
            <p className="intake-info"><IntakeIcon name="lock" />{text('privacy')}</p><p className="intake-field-hint">{text('contactNotSaved')}</p>
          </> : question ? renderText(question) : null}
          {status === 'error' && <p className="intake-error intake-submission-error" role="alert">{text('submissionError')}</p>}
          <IntakeActions back={state.visited.length > 1} loading={status === 'loading'} onBack={() => { flow.emit('question_back'); flow.navigate({ type: 'back' }); setErrors({}); setBackwards(true); }} label={review ? text(status === 'loading' ? 'submitting' : status === 'error' ? 'retry' : 'send') : state.editing ? text('saveReview') : question?.type === 'contact' ? text('reviewAnswers') : needsContinue ? text('continue') : undefined} hint={question?.id === 'q01_relationship' ? text('selectHint') : text('chooseOne')} />
        </StepPanel>
      </AnimatePresence>}
      <div className="intake-meta"><p>{text('demo')}</p><div aria-label={text('language')}><button type="button" aria-pressed={lang === 'en'} onClick={() => { flow.cancelAuto(); setErrors({}); setLang('en'); }}>EN</button><span aria-hidden="true">·</span><button type="button" aria-pressed={lang === 'es'} onClick={() => { flow.cancelAuto(); setErrors({}); setLang('es'); }}>ES</button></div></div>
      {flow.storageError && <p className="intake-error" role="status">{text('storageUnavailable')}</p>}
    </main>
    {flow.draft && <IntakeDialog title={text('resumeTitle')} onCancel={flow.restart}><p>{text('resumeBody')}</p><div><Button onClick={flow.resume}>{text('resume')}</Button><Button variant="ghost" onClick={flow.restart}>{text('restart')}</Button></div></IntakeDialog>}
    {exitOpen && <IntakeDialog title={text('exitTitle')} onCancel={() => setExitOpen(false)}><p>{flow.storageError ? text('storageUnavailable') : text('exitBody')}</p><div><Button onClick={() => setExitOpen(false)}>{text('keepGoing')}</Button><Button variant="ghost" onClick={() => { if (flow.save()) flow.emit('intake_saved'); flow.emit('intake_exited'); navigate('/'); }}>{text('exit')}</Button></div></IntakeDialog>}
  </div>;
}

export default function IntakePage() {
  const { t } = useTranslation();
  const [content, setContent] = useState<{ definition?: IntakeDefinition; error?: boolean }>({});
  useEffect(() => {
    let active = true;
    definitionPromise.then(definition => { if (active) setContent({ definition }); }).catch(error => { console.error(error); if (active) setContent({ error: true }); });
    return () => { active = false; };
  }, []);
  if (!content.definition) return <main className="intake-loading" role="status"><div><p>{t(content.error ? 'intake.contentError' : 'intake.loading')}</p>{content.error && <Link className="pill-button" to="/">{t('intake.return')}</Link>}</div></main>;
  return <IntakeExperience definition={content.definition} />;
}
