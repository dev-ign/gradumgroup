import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { Button } from './Button';

const INQUIRY_TYPES = [
  'Consulting Inquiry',
  'Construction Project',
  'Accounting & Finance',
  'Marketing & Media',
  'Accelerator Program',
  'General Inquiry',
];

const COUNTRIES = [
  'United States', 'Dominican Republic', 'Colombia', 'Mexico',
  'Panama', 'Puerto Rico', 'Canada', 'Other',
];

export function ContactModal() {
  const { isOpen, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                  Request a Consultation
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1 tracking-wide">
                  A member of our team will contact you shortly.
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Close modal"
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
                  <p className="text-[#AEE37B] font-semibold tracking-wide text-lg mb-2">Message Received</p>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Thank you. A member of our team will contact you shortly.
                  </p>
                  <Button onClick={closeModal} variant="outline" size="sm" className="mt-8">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>Name *</label>
                      <input ref={firstInputRef} id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Full name" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelClass}>Company</label>
                      <input id="company" name="company" type="text"
                        value={form.company} onChange={handleChange}
                        placeholder="Organization" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email *</label>
                      <input id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="you@company.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone</label>
                      <input id="phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="+1 (000) 000-0000" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="country" className={labelClass}>Country</label>
                      <select id="country" name="country"
                        value={form.country} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className={labelClass}>Inquiry Type</label>
                      <select id="inquiryType" name="inquiryType"
                        value={form.inquiryType} onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                      >
                        <option value="">Select type</option>
                        {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className={labelClass}>Message *</label>
                      <textarea id="message" name="message" rows={4} required
                        value={form.message} onChange={handleChange}
                        placeholder="Briefly describe your project or inquiry..."
                        className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button type="button" onClick={closeModal}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 tracking-wide">
                      Cancel
                    </button>
                    <Button type="submit" variant="primary" size="md">
                      Submit Inquiry
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
