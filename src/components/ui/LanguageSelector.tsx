import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, type Language } from '../../context/LanguageContext';
import { useTranslation } from '../../i18n/useTranslation';

const LANGUAGES: { code: Language; labelKey: string }[] = [
  { code: 'en', labelKey: 'nav.english' },
  { code: 'es', labelKey: 'nav.spanish' },
];

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={t('nav.selectLanguage')}
        className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {lang.toUpperCase()}
        <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M0 0l5 6 5-6H0z" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-0 mb-2 w-32 py-1.5 z-50"
            style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid var(--border-color)', backdropFilter: 'blur(16px)' }}
          >
            {LANGUAGES.map(({ code, labelKey }) => (
              <li key={code}>
                <button
                  onClick={() => { setLang(code); setOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                    lang === code ? 'text-[var(--accent-fg)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-fg)]'
                  }`}
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {t(labelKey)}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
