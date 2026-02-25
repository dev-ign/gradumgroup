import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';
import { Button } from './Button';

export function ContactModal() {
  const { isOpen, closeModal } = useModal();
  const { t, tArray } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inquiryTypes = tArray('modal.inquiryTypes');
  const countries = tArray('modal.countries');
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', inquiryType: '', message: '',
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
      setForm({ name: '', company: '', email: '', phone: '', country: '', inquiryType: '', message: '' });
    }
    if (!isOpen) {
      setLoading(false);
      setError(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json() as { success?: boolean; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] px-4 py-3 text-sm focus:outline-none focus:border-[#AEE37B] transition-colors duration-200';
  const labelClass = 'block text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-1.5';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(10,41,36,0.85)', backdropFilter: 'blur(4px)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-[var(--border-color)]">
              <div>
                <h2 id="modal-title" className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  {t('modal.title')}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1 tracking-wide">
                  {t('modal.subtitle')}
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label={t('modal.closeLabel')}
                className="ml-4 mt-0.5 text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-[#AEE37B] font-semibold tracking-wide text-lg mb-2">{t('modal.messageReceived')}</p>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {t('modal.thankYou')}
                  </p>
                  <Button onClick={closeModal} variant="outline" size="sm" className="mt-8">
                    {t('common.close')}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>{t('modal.name')}</label>
                      <input ref={firstInputRef} id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder={t('modal.namePlaceholder')} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>{t('modal.company')}</label>
                      <input id="company" name="company" type="text"
                        value={form.company} onChange={handleChange}
                        placeholder={t('modal.companyPlaceholder')} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>{t('modal.email')}</label>
                      <input id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder={t('modal.emailPlaceholder')} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>{t('modal.phone')}</label>
                      <input id="phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder={t('modal.phonePlaceholder')} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="country" className={labelClass}>{t('modal.country')}</label>
                      <select id="country" name="country"
                        value={form.country} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                      >
                        <option value="">{t('modal.selectCountry')}</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className={labelClass}>{t('modal.inquiryType')}</label>
                      <select id="inquiryType" name="inquiryType"
                        value={form.inquiryType} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                      >
                        <option value="">{t('modal.selectType')}</option>
                        {inquiryTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClass}>{t('modal.message')}</label>
                      <textarea id="message" name="message" rows={4} required
                        value={form.message} onChange={handleChange}
                        placeholder={t('modal.messagePlaceholder')}
                        className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 px-4 py-2.5 text-xs font-semibold tracking-wide text-red-400 border border-red-400/30 bg-red-400/5"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button type="button" onClick={closeModal} disabled={loading}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 tracking-wide disabled:opacity-40">
                      {t('common.cancel')}
                    </button>
                    <Button type="submit" variant="primary" size="md" disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending…
                        </span>
                      ) : t('common.submitInquiry')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
