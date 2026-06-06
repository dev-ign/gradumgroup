import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { NavbarWordmark } from '../ui/NavbarWordmark';
import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';

const NAV_LINKS = [
  { labelKey: 'nav.home', sectionId: 'hero' },
  { labelKey: 'nav.about', sectionId: 'about' },
  { labelKey: 'nav.platform', sectionId: 'platform' },
  { labelKey: 'nav.execution', sectionId: 'execution' },
];

export function Navbar() {
  const { openModal } = useModal();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navOffset = 80;
    const startY = window.scrollY;
    const targetY = section.getBoundingClientRect().top + startY - navOffset;
    const scrollState = { y: startY };

    gsap.killTweensOf(scrollState);
    gsap.to(scrollState, {
      y: Math.max(targetY, 0),
      duration: 0.85,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onUpdate: () => window.scrollTo(0, scrollState.y),
    });
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;
    const sectionId = location.hash.slice(1);
    let settleTimeout: number | undefined;
    const frameId = requestAnimationFrame(() => {
      scrollToSection(sectionId);
      settleTimeout = window.setTimeout(() => scrollToSection(sectionId), 500);
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (settleTimeout) window.clearTimeout(settleTimeout);
    };
  }, [location.hash, location.pathname, scrollToSection]);

  const handleSectionNav = (sectionId: string) => {
    setMobileOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    window.history.replaceState(null, '', `#${sectionId}`);
    scrollToSection(sectionId);
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
        <Link to="/" className="group flex items-center shrink-0" aria-label="Gradum Group home">
          <NavbarWordmark className="h-8 w-auto transition-transform duration-200 group-hover:scale-[1.02] sm:h-9" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 mx-8">
          {NAV_LINKS.map(({ labelKey, sectionId }) => (
            <button
              key={sectionId}
              type="button"
              onClick={() => handleSectionNav(sectionId)}
              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 tracking-wide"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {/* Desktop right: CTA only */}
        <div className="hidden md:flex items-center">
          <button
            onClick={openModal}
            className="text-xs bg-[#AEE37B] hover:bg-[#c8f090] font-semibold px-4 py-2 border border-[var(--border-color)] text-[#0A2924] hover:border-[var(--accent-fg)] transition-all duration-200 tracking-wide rounded-full"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {t('common.requestConsultation')}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
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
            <ul className="px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map(({ labelKey, sectionId }) => (
                <li key={sectionId}>
                  <button
                    type="button"
                    onClick={() => handleSectionNav(sectionId)}
                    className="text-left text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {t(labelKey)}
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-[var(--border-color)]">
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="w-full text-sm font-semibold py-2.5 text-[#AEE37B] transition-colors duration-200 text-left"
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
