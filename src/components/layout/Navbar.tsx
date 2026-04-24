import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NavbarWordmark } from '../ui/NavbarWordmark';
import { useModal } from '../../context/ModalContext';
import { useLanguage, type Language } from '../../context/LanguageContext';
import { useTranslation } from '../../i18n/useTranslation';

const LANGUAGES: { code: Language; labelKey: string }[] = [
  { code: 'en', labelKey: 'nav.english' },
  { code: 'es', labelKey: 'nav.spanish' },
];

function LanguageSelector() {
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
            className="absolute top-full right-0 mt-2 w-32 py-1.5"
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

// ─── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        style={{ fontFamily: 'var(--font-ui)' }}
      >

        {/* Logo */}
        <Link to="/" className="group flex items-center" aria-label="Gradum Group home">
          <NavbarWordmark className="h-8 w-auto transition-transform duration-200 group-hover:scale-[1.02] sm:h-9" />
        </Link>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={openModal}
            className="text-xs bg-[#AEE37B] hover:bg-[#c8f090] font-semibold px-4 py-2 border border-[var(--border-color)] text-[#0A2924] hover:border-[var(--accent-fg)] transition-all duration-200 tracking-wide rounded-full"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {t('common.requestConsultation')}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="text-[var(--text-primary)] hover:text-[#AEE37B] transition-colors duration-200 p-1"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="3" y1="3" x2="19" y2="19" />
                  <line x1="19" y1="3" x2="3" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--border-color)]"
            style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(16px)', fontFamily: 'var(--font-ui)' }}
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              <li>
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {t('common.requestConsultation')}
                </button>
              </li>
              <li className="pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="w-full text-sm font-semibold py-3 text-[var(--text-primary)] hover:text-[var(--accent-fg)] transition-colors duration-200 text-left"
                >
                  {t('common.requestConsultation')} ›
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
