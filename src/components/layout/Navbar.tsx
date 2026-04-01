import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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

// ─── Type definitions ───────────────────────────────────────────────────────

type FlyoutItem = { labelKey: string; to: string };

type DropdownItem =
  | { labelKey: string; to: string; flyout?: undefined; featured?: false }
  | { labelKey: string; to?: undefined; flyout: FlyoutItem[]; activePrefix: string; featured?: false }
  | { labelKey: string; to: string; flyout?: undefined; featured: true };

type NavItem =
  | { labelKey: string; to: string; dropdown?: undefined; action?: undefined }
  | { labelKey: string; action: 'modal'; dropdown?: undefined; to?: undefined }
  | { labelKey: string; dropdown: DropdownItem[]; to?: undefined; action?: undefined };

// ─── Nav structure ──────────────────────────────────────────────────────────

const NAV_LINKS: NavItem[] = [
  { labelKey: 'nav.home', to: '/' },
  {
    labelKey: 'nav.platform',
    dropdown: [
      { labelKey: 'common.consulting', to: '/consulting' },
      { labelKey: 'common.construction', to: '/construction' },
      {
        labelKey: 'common.services',
        activePrefix: '/services',
        flyout: [
          { labelKey: 'nav.accountingFinance', to: '/services/accounting-finance' },
          { labelKey: 'nav.marketingMedia', to: '/services/marketing-media' },
        ],
      },
      { labelKey: 'common.accelerator', to: '/accelerator', featured: true },
    ],
  },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.contact', action: 'modal' },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
    setPlatformOpen(false);
    setServicesOpen(false);
  }

  const isPlatformActive =
    location.pathname.startsWith('/consulting') ||
    location.pathname.startsWith('/construction') ||
    location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/accelerator');

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }`;

  const dropdownItemClass = (active: boolean) =>
    `flex items-center w-full px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
      active ? 'text-[var(--accent-fg)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-fg)]'
    }`;

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--nav-bg)',
    border: '1px solid var(--border-color)',
    backdropFilter: 'blur(16px)',
    fontFamily: 'var(--font-ui)',
  };

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

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <li key={item.labelKey} className="relative">

              {item.action === 'modal' ? (
                <button
                  onClick={openModal}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {t(item.labelKey)}
                </button>

              ) : item.dropdown ? (
                <div
                  className="relative"
                  onMouseEnter={() => setPlatformOpen(true)}
                  onMouseLeave={() => { setPlatformOpen(false); setServicesOpen(false); }}
                >
                  <button
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                      isPlatformActive || platformOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t(item.labelKey)}
                    <svg
                      width="9" height="5" viewBox="0 0 10 6" fill="currentColor"
                      className={`transition-transform duration-200 opacity-50 ${platformOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M0 0l5 6 5-6H0z" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {platformOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.12 }}
                        className="absolute top-full left-0 mt-2 w-48 py-1.5"
                        style={panelStyle}
                      >
                        {item.dropdown.map((sub) => (
                          sub.flyout ? (
                            <li
                              key={sub.labelKey}
                              className="relative"
                              onMouseEnter={() => setServicesOpen(true)}
                              onMouseLeave={() => setServicesOpen(false)}
                            >
                              <div className={dropdownItemClass(location.pathname.startsWith(sub.activePrefix) || servicesOpen)}>
                                <span className="flex-1">{t(sub.labelKey)}</span>
                                <svg width="5" height="9" viewBox="0 0 6 10" fill="currentColor" className="opacity-40">
                                  <path d="M0 0l6 5-6 5V0z" />
                                </svg>
                              </div>
                              <AnimatePresence>
                                {servicesOpen && (
                                  <motion.ul
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -6 }}
                                    transition={{ duration: 0.12 }}
                                    className="absolute left-full top-0 w-52 py-1.5"
                                    style={panelStyle}
                                  >
                                    {sub.flyout.map((leaf) => (
                                      <li key={leaf.labelKey}>
                                        <NavLink
                                          to={leaf.to}
                                          onClick={() => { setPlatformOpen(false); setServicesOpen(false); }}
                                          className={({ isActive }) => dropdownItemClass(isActive)}
                                        >
                                          {t(leaf.labelKey)}
                                        </NavLink>
                                      </li>
                                    ))}
                                    <li>
                                      <div className="mx-4 my-1" style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
                                    </li>
                                    <li>
                                      <NavLink
                                        to="/services"
                                        end
                                        onClick={() => { setPlatformOpen(false); setServicesOpen(false); }}
                                        className={({ isActive }) =>
                                          `flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors duration-150 ${
                                            isActive ? 'text-[#AEE37B]' : 'text-[var(--text-secondary)] hover:text-[#AEE37B]'
                                          }`
                                        }
                                      >
                                        {t('nav.viewAllServices')}
                                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M2 8L8 2M8 2H4M8 2v4" />
                                        </svg>
                                      </NavLink>
                                    </li>
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </li>

                          ) : sub.featured ? (
                            <li key={sub.labelKey}>
                              <div className="mx-4 mb-1" style={{ height: '1px', backgroundColor: 'var(--border-color)' }} />
                              <NavLink
                                to={sub.to}
                                onClick={() => setPlatformOpen(false)}
                                className={({ isActive }) =>
                                  `relative flex items-center gap-2.5 w-full px-4 py-2.5 transition-all duration-200 ${
                                    isActive ? 'bg-[#AEE37B]/10' : 'hover:bg-[#AEE37B]/8'
                                  }`
                                }
                              >
                                <span className="relative flex-shrink-0 w-2 h-2">
                                  <span className="absolute inset-0 rounded-full bg-[#AEE37B] animate-ping opacity-60" />
                                  <span className="relative block w-2 h-2 rounded-full bg-[#AEE37B]" />
                                </span>
                                <span className="flex-1 text-sm font-medium text-[var(--accent-fg)]">
                                  {t(sub.labelKey)}
                                </span>
                                <span className="text-[9px] font-semibold tracking-[0.12em] uppercase px-1.5 py-0.5 text-[var(--accent-fg)]"
                                  style={{ border: '1px solid rgba(174,227,123,0.35)', backgroundColor: 'rgba(174,227,123,0.08)' }}
                                >
                                  SOON
                                </span>
                              </NavLink>
                            </li>

                          ) : (
                            <li key={sub.labelKey}>
                              <NavLink
                                to={sub.to}
                                onClick={() => setPlatformOpen(false)}
                                className={({ isActive }) => dropdownItemClass(isActive)}
                              >
                                {t(sub.labelKey)}
                              </NavLink>
                            </li>
                          )
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
            className="text-xs bg-[#AEE37B] hover:bg-[#c8f090] font-semibold px-4 py-2 border border-[var(--border-color)] text-[#0A2924] hover:border-[var(--accent-fg)] transition-all duration-200 tracking-wide rounded-full"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {t('common.scheduleDemo')}
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
                <NavLink to="/" end className={navLinkClass} onClick={() => setMobileOpen(false)}>
                  {t('nav.home')}
                </NavLink>
              </li>

              <li>
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--text-secondary)]">
                  {t('nav.platform')}
                </span>
                <ul className="mt-2 flex flex-col gap-1">
                  {[
                    { labelKey: 'common.consulting', to: '/consulting' },
                    { labelKey: 'common.construction', to: '/construction' },
                  ].map(s => (
                    <li key={s.labelKey}>
                      <NavLink to={s.to} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                        {t(s.labelKey)}
                      </NavLink>
                    </li>
                  ))}

                  <li className="pt-1">
                    <span
                      className={`text-sm font-medium ${
                        location.pathname.startsWith('/services') ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {t('common.services')}
                    </span>
                    <ul className="mt-1.5 pl-3 flex flex-col gap-1 border-l border-[var(--border-color)]">
                      {[
                        { labelKey: 'nav.accountingFinance', to: '/services/accounting-finance' },
                        { labelKey: 'nav.marketingMedia', to: '/services/marketing-media' },
                      ].map(s => (
                        <li key={s.labelKey}>
                          <NavLink to={s.to} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                            {t(s.labelKey)}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="pt-1">
                    <div style={{ height: '1px', backgroundColor: 'var(--border-color)', marginBottom: '6px' }} />
                    <NavLink
                      to="/accelerator"
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 py-1 transition-colors duration-150 ${
                          isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                        }`
                      }
                    >
                      <span className="relative flex-shrink-0 w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-[#AEE37B] animate-ping opacity-60" />
                        <span className="relative block w-2 h-2 rounded-full bg-[#AEE37B]" />
                      </span>
                      <span className="text-sm font-medium text-[var(--accent-fg)]">{t('common.accelerator')}</span>
                      <span className="text-[9px] font-semibold tracking-[0.12em] uppercase px-1.5 py-0.5 text-[var(--accent-fg)]"
                        style={{ border: '1px solid rgba(174,227,123,0.35)', backgroundColor: 'rgba(174,227,123,0.08)' }}
                      >
                        SOON
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                  {t('nav.about')}
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li className="pt-2 border-t border-[var(--border-color)]">
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="w-full text-sm font-semibold py-3 text-[var(--text-primary)] hover:text-[var(--accent-fg)] transition-colors duration-200 text-left"
                >
                  {t('common.scheduleDemo')} ›
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
