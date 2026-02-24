import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
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
        className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:text-[#AEE37B] transition-colors duration-200"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-36 py-2"
            style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid var(--border-color)', backdropFilter: 'blur(12px)' }}
          >
            {LANGUAGES.map(({ code, labelKey }) => (
              <li key={code}>
                <button
                  onClick={() => { setLang(code); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-150 ${
                    lang === code ? 'text-[#AEE37B] bg-[#AEE37B]/5' : 'text-[var(--text-primary)] hover:text-[#AEE37B] hover:bg-[#AEE37B]/5'
                  }`}
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

const NAV_LINKS = [
  { labelKey: 'nav.home', to: '/' },
  {
    labelKey: 'nav.platform',
    dropdown: [
      { labelKey: 'common.consulting', to: '/consulting' },
      { labelKey: 'common.construction', to: '/construction' },
      { labelKey: 'common.services', to: '/services' },
      { labelKey: 'common.accelerator', to: '/accelerator' },
    ],
  },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.contact', action: 'modal' as const },
];

export function Navbar() {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setPlatformOpen(false);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-[#AEE37B]' : 'text-[var(--text-primary)] hover:text-[#AEE37B]'
    }`;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Gradum Group home">
          <span className="text-lg font-black tracking-tight text-[var(--text-primary)] group-hover:text-[#AEE37B] transition-colors duration-200">
            GRADUM
          </span>
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[var(--text-secondary)] uppercase self-end pb-0.5">
            GROUP
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <li key={item.labelKey} className="relative">
              {item.action === 'modal' ? (
                <button
                  onClick={openModal}
                  className="text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  {t(item.labelKey)}
                </button>
              ) : item.dropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setPlatformOpen(true)}
                  onMouseLeave={() => setPlatformOpen(false)}
                >
                  <button className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:text-[#AEE37B] transition-colors duration-200">
                    {t(item.labelKey)}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" className={`transition-transform duration-200 ${platformOpen ? 'rotate-180' : ''}`}>
                      <path d="M0 0l5 6 5-6H0z" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {platformOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-48 py-2"
                        style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid var(--border-color)', backdropFilter: 'blur(12px)' }}
                      >
                        {item.dropdown.map((sub) => (
                          <li key={sub.labelKey}>
                            <NavLink
                              to={sub.to}
                              onClick={() => setPlatformOpen(false)}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors duration-150 ${
                                  isActive ? 'text-[#AEE37B] bg-[#AEE37B]/5' : 'text-[var(--text-primary)] hover:text-[#AEE37B] hover:bg-[#AEE37B]/5'
                                }`
                              }
                            >
                              {t(sub.labelKey)}
                            </NavLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink to={item.to!} end={item.to === '/'} className={navLinkClass}>
                  {t(item.labelKey)}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={openModal}
            className="text-xs font-bold tracking-widest uppercase px-5 py-2.5 bg-[#AEE37B] text-[#0A2924] hover:bg-[#9dd468] transition-colors duration-200"
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
            style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(12px)' }}
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              <li>
                <NavLink to="/" end className={navLinkClass} onClick={() => setMobileOpen(false)}>{t('nav.home')}</NavLink>
              </li>
              <li>
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)]">{t('nav.platform')}</span>
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  {[
                    { labelKey: 'common.consulting', to: '/consulting' },
                    { labelKey: 'common.construction', to: '/construction' },
                    { labelKey: 'common.services', to: '/services' },
                    { labelKey: 'common.accelerator', to: '/accelerator' },
                  ].map(s => (
                    <li key={s.labelKey}>
                      <NavLink to={s.to} className={navLinkClass} onClick={() => setMobileOpen(false)}>{t(s.labelKey)}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>{t('nav.about')}</NavLink>
              </li>
              <li>
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="text-xs font-semibold tracking-widest uppercase text-[var(--text-primary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="w-full text-xs font-bold tracking-widest uppercase px-5 py-3 bg-[#AEE37B] text-[#0A2924] hover:bg-[#9dd468] transition-colors duration-200"
                >
                  {t('common.clientAccess')}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
