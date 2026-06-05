import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';

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

  const inputClass = 'w-full px-4 py-3 text-sm focus:outline-none transition-all duration-200';
  const labelClass = 'block text-xs font-semibold tracking-widest uppercase mb-1.5';
  const inputStyle: React.CSSProperties = {
    background: 'rgba(199, 211, 234, 0.06)',
    border: '1px solid rgba(186, 215, 247, 0.14)',
    borderRadius: 4,
    color: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    letterSpacing: '-0.01em',
    boxShadow: 'inset 0 1px 1px rgba(216, 236, 248, 0.08)',
  };
  const labelStyle: React.CSSProperties = {
    color: '#9DA7C2',
    fontFamily: 'var(--font-mono)',
  };
  const optionStyle: React.CSSProperties = {
    backgroundColor: '#080C24',
    color: '#D8DCEC',
  };
  const secondaryButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#9DA7C2',
    fontFamily: 'var(--font-body)',
  };
  const primaryButtonStyle: React.CSSProperties = {
    minHeight: 44,
    border: '1px solid rgba(174, 227, 123, 0.36)',
    borderRadius: 999,
    background: 'var(--gd-accent)',
    color: 'var(--gd-accent-fg)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: '0.01em',
    padding: '0 22px',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.18), 0 0 24px var(--gd-accent-glow)',
  };

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
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 18%, rgba(26,35,88,0.50), transparent 62%), rgba(5, 6, 15, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
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
            style={{
              background:
                'radial-gradient(ellipse 65% 45% at 85% 0%, rgba(186,215,247,0.08), transparent 70%), rgba(5, 6, 15, 0.97)',
              border: '1px solid rgba(186, 215, 247, 0.16)',
              borderRadius: 16,
              boxShadow:
                'inset 0 1px 1px rgba(216,236,248,0.20), inset 0 24px 48px rgba(168,216,245,0.06), 0 24px 64px rgba(0,0,0,0.48)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between p-6"
              style={{ borderBottom: '1px solid rgba(186, 215, 247, 0.14)' }}
            >
              <div>
                <h2
                  id="modal-title"
                  className="text-xl font-bold tracking-tight"
                  style={{ color: '#FFFFFF', fontFamily: 'var(--font-ui)' }}
                >
                  {t('modal.title')}
                </h2>
                <p
                  className="text-xs mt-1 tracking-wide"
                  style={{ color: '#9DA7C2', fontFamily: 'var(--font-body)' }}
                >
                  {t('modal.subtitle')}
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label={t('modal.closeLabel')}
                className="ml-4 mt-0.5 transition-colors duration-200 text-2xl leading-none"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: '1px solid rgba(186, 215, 247, 0.14)',
                  color: '#D1E4FA',
                  background: 'rgba(186, 214, 247, 0.04)',
                  lineHeight: 1,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#B6D9FC'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#D1E4FA'; }}
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
                  <div
                    className="text-2xl mb-4 mx-auto flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 999,
                      color: 'var(--gd-accent-fg)',
                      background: 'var(--gd-accent)',
                      boxShadow: '0 0 24px var(--gd-accent-glow)',
                    }}
                  >
                    ✓
                  </div>
                  <p className="font-semibold tracking-wide text-lg mb-2" style={{ color: '#D8ECF8' }}>{t('modal.messageReceived')}</p>
                  <p className="text-sm" style={{ color: '#9DA7C2' }}>
                    {t('modal.thankYou')}
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-8 px-5 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.98]"
                    style={{
                      border: '1px solid rgba(186, 215, 247, 0.18)',
                      borderRadius: 999,
                      color: '#D1E4FA',
                      background: 'rgba(186, 214, 247, 0.06)',
                    }}
                  >
                    {t('common.close')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass} style={labelStyle}>{t('modal.name')}</label>
                      <input ref={firstInputRef} id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder={t('modal.namePlaceholder')} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass} style={labelStyle}>{t('modal.company')}</label>
                      <input id="company" name="company" type="text"
                        value={form.company} onChange={handleChange}
                        placeholder={t('modal.companyPlaceholder')} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass} style={labelStyle}>{t('modal.email')}</label>
                      <input id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder={t('modal.emailPlaceholder')} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass} style={labelStyle}>{t('modal.phone')}</label>
                      <input id="phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder={t('modal.phonePlaceholder')} className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="country" className={labelClass} style={labelStyle}>{t('modal.country')}</label>
                      <select id="country" name="country"
                        value={form.country} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={inputStyle}
                      >
                        <option value="" style={optionStyle}>{t('modal.selectCountry')}</option>
                        {countries.map(c => <option key={c} value={c} style={optionStyle}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className={labelClass} style={labelStyle}>{t('modal.inquiryType')}</label>
                      <select id="inquiryType" name="inquiryType"
                        value={form.inquiryType} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={inputStyle}
                      >
                        <option value="" style={optionStyle}>{t('modal.selectType')}</option>
                        {inquiryTypes.map(type => <option key={type} value={type} style={optionStyle}>{type}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClass} style={labelStyle}>{t('modal.message')}</label>
                      <textarea id="message" name="message" rows={4} required
                        value={form.message} onChange={handleChange}
                        placeholder={t('modal.messagePlaceholder')}
                        className={`${inputClass} resize-none`} style={inputStyle} />
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
                      className="text-sm transition-colors duration-200 tracking-wide disabled:opacity-40"
                      style={secondaryButtonStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#D8ECF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#9DA7C2'; }}
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                      style={primaryButtonStyle}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending…
                        </span>
                      ) : t('common.submitInquiry')}
                    </button>
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
