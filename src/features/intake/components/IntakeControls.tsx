import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { Button } from '../../../components/ui/Button';
import { useTranslation } from '../../../i18n/useTranslation';
import type { Answer, IntakeDefinition, Locale, Question, StageId } from '../config/types';

export function IntakeIcon({ name }: { name: string }) {
  return <img className="intake-icon" src={`/assets/intake/${name}.svg`} alt="" />;
}
export function IntakeHeader({ definition, stage, locale, done, onExit }: { definition: IntakeDefinition; stage: StageId; locale: Locale; done: boolean; onExit: () => void }) {
  const { t } = useTranslation();
  const index = definition.stages.findIndex(s => s.id === stage);
  return <header className="intake-header">
    <div onClick={event => { event.preventDefault(); onExit(); }}><BrandLogo /></div>
    <ol className="intake-progress" aria-label={t('intake.progress')}>
      {definition.stages.map((s, i) => <li key={s.id} className={`${i === index ? 'is-current' : ''} ${done || i < index ? 'is-complete' : ''}`} aria-current={!done && i === index ? 'step' : undefined}>
        {done || i < index ? <span className="intake-stage-check" aria-hidden="true"><IntakeIcon name="check-stage" /></span> : <IntakeIcon name={i === index ? 'dot-active' : 'dot-inactive'} />}
        <span>{done && i === index ? <><span className="intake-desktop-copy">{s.label[locale]}</span><span className="intake-mobile-copy">{t('intake.complete')}</span></> : s.label[locale]}</span>
      </li>)}
    </ol>
    <button type="button" className="intake-exit" onClick={onExit}><span>{t(done ? 'intake.close' : 'intake.saveExit')}</span><IntakeIcon name="close" /></button>
    <div className="intake-progress-track" aria-hidden="true"><span style={{ width: `${done ? 100 : (index + 0.5) / definition.stages.length * 100}%` }} /></div>
  </header>;
}

export function AnswerChoices({ question, answer, locale, onChange, error, onEnter }: { question: Extract<Question, { type: 'single' | 'multi' }>; answer: Answer | undefined; locale: Locale; onChange: (value: string) => void; error?: string; onEnter: () => void }) {
  const cards = question.type === 'single' && question.presentation === 'cards';
  return <fieldset className={`intake-choices ${cards ? 'intake-choices--cards' : ''}`} aria-labelledby="intake-title" aria-describedby={error ? `${question.id}-error` : undefined}>
    {question.options.map(option => {
      const selected = question.type === 'multi' ? Array.isArray(answer) && answer.includes(option.value) : answer === option.value;
      return <label key={option.value} className={`intake-choice ${cards ? 'intake-choice--card' : ''} ${selected ? 'is-selected' : ''}`}>
        <input type={question.type === 'multi' ? 'checkbox' : 'radio'} name={question.id} value={option.value} checked={selected} onChange={() => onChange(option.value)} aria-describedby={error ? `${question.id}-error` : undefined} aria-invalid={!!error} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); if (!selected) onChange(option.value); else onEnter(); } }} />
        {cards ? <span className="intake-card-top"><span className="intake-icon-tile">{option.icon && <IntakeIcon name={option.icon} />}</span><span className="intake-indicator">{selected && <IntakeIcon name="check-selected" />}</span></span> : <><span className={`intake-indicator ${question.type === 'multi' ? 'intake-indicator--square' : ''}`}>{selected && <IntakeIcon name="check-selected" />}</span>{option.icon && <IntakeIcon name={option.icon} />}</>}
        <span className="intake-choice-copy"><span className="intake-choice-label">{option.label[locale]}</span>{option.description && <span className="intake-choice-description"><span className={option.mobileDescription ? 'intake-desktop-copy' : ''}>{option.description[locale]}</span>{option.mobileDescription && <span className="intake-mobile-copy">{option.mobileDescription[locale]}</span>}</span>}</span>
      </label>;
    })}
  </fieldset>;
}
export function IntakeTextField({ id, label, value, onChange, onBlur, type = 'text', autocomplete, hint, error, required = true, maxLength = 1000, multiline = false, focus = false }: { id: string; label: string; value: string; onChange: (value: string) => void; onBlur: () => void; type?: 'text' | 'email' | 'tel'; autocomplete?: string; hint?: string; error?: string; required?: boolean; maxLength?: number; multiline?: boolean; focus?: boolean }) {
  const { t } = useTranslation();
  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  useEffect(() => { if (focus) input.current?.focus(); }, [focus]);
  const props = { id, ref: input, value, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value), onBlur, required, maxLength, 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined };
  return <div className="intake-field">
    <div className="intake-field-label"><label htmlFor={id}>{label}</label><span>{t(required ? 'intake.required' : 'intake.optional')}</span></div>
    {multiline ? <textarea {...props} rows={4} /> : <input {...props} type={type} inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'text'} autoComplete={autocomplete} />}
    {error ? <p className="intake-error" id={`${id}-error`} role="alert">{error}</p> : hint ? <p className="intake-field-hint" id={`${id}-hint`}>{hint}</p> : null}
  </div>;
}
export function IntakeActions({ back, label, hint, loading, onBack }: { back: boolean; label?: string; hint?: string; loading?: boolean; onBack: () => void }) {
  const { t } = useTranslation();
  return <div className={`intake-actions ${!back ? 'intake-actions--root' : ''}`}>
    {back ? <button type="button" className="intake-back" onClick={onBack} disabled={loading}><IntakeIcon name="arrow-left" />{t('intake.back')}</button> : <span />}
    {label ? <Button type="submit" className="intake-primary" disabled={loading}>{loading && <span className="intake-spinner" aria-hidden="true" />}{label}{!loading && <IntakeIcon name="arrow-right" />}</Button> : <p className="intake-action-hint"><span className={!back ? 'intake-desktop-copy' : ''}>{hint}</span>{!back && <span className="intake-mobile-copy">{t('intake.tap')}</span>}</p>}
  </div>;
}
export function IntakeDialog({ title, children, onCancel }: { title: string; children: ReactNode; onCancel: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    return () => { dialog?.close(); opener?.focus({ preventScroll: true }); };
  }, []);
  return <dialog className="intake-dialog" ref={ref} aria-labelledby="intake-dialog-title" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <h2 id="intake-dialog-title">{title}</h2>{children}
  </dialog>;
}
