import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { getActivePlatformGroupIndex, isRouteActive, platformNavigation } from '../../data/navigation';
import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';
import { BrandLogo } from '../ui/BrandLogo';

const labelKeys: Record<string, string> = {
  About: 'nav.about', Ventures: 'nav.ventures', Insights: 'nav.insights', Platform: 'nav.platform',
  Consulting: 'nav.consulting', Construction: 'nav.construction', Services: 'nav.services', Overview: 'nav.overview',
  Capabilities: 'nav.capabilities', Industries: 'nav.industries', 'How We Work': 'nav.howWeWork',
  Architecture: 'nav.architecture', Engineering: 'nav.engineering', Build: 'nav.build',
  'Accounting & Finance': 'nav.accountingFinance', 'Marketing & Media': 'nav.marketingMedia', 'Admin & Legal': 'nav.adminLegal',
};

export function Navbar() {
  const { pathname } = useLocation();
  const { openModal } = useModal();
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const activePlatformIndex = getActivePlatformGroupIndex(pathname);
  const platformIsActive = activePlatformIndex >= 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 72);
  const [activeGroup, setActiveGroup] = useState(() => Math.max(0, activePlatformIndex));
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const familyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const restoreScrollRef = useRef(true);

  const motionTransition = { duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const accordionTransition = { duration: reducedMotion ? 0 : 0.24, ease: [0.25, 0.1, 0.25, 1] as const };

  const label = (value: string) => {
    const key = labelKeys[value];
    return key ? t(key) : value;
  };
  const openMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (!menuOpen && activePlatformIndex >= 0) setActiveGroup(activePlatformIndex);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      if (!platformRef.current?.contains(document.activeElement)) setMenuOpen(false);
    }, 180);
  };
  const focusFamily = (index: number) => {
    setActiveGroup(index);
    familyRefs.current[index]?.focus();
  };
  const onFamilyKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = platformNavigation.length - 1;
    const next = event.key === 'ArrowDown' ? (index + 1) % (last + 1)
      : event.key === 'ArrowUp' ? (index + last) % (last + 1)
        : event.key === 'Home' ? 0 : event.key === 'End' ? last : null;
    if (next !== null) {
      event.preventDefault();
      focusFamily(next);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      platformRef.current?.querySelector<HTMLAnchorElement>('.platform-menu__children a')?.focus();
    }
  };

  const openMobileMenu = () => {
    restoreScrollRef.current = true;
    setMobilePlatformOpen(platformIsActive);
    setMobileGroup(platformIsActive ? platformNavigation[activePlatformIndex].href : null);
    setMobileOpen(true);
  };

  const closeMobileMenu = (restoreScroll = true) => {
    restoreScrollRef.current = restoreScroll;
    setMobileOpen(false);
  };

  const toggleMobileMenu = () => {
    if (mobileOpen) closeMobileMenu();
    else openMobileMenu();
  };

  const closeForNavigation = () => closeMobileMenu(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const next = window.scrollY > 72;
      setScrolled((current) => current === next ? current : next);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
      setMobileOpen(false);
      setMobilePlatformOpen(false);
      setMobileGroup(null);
      setActiveGroup(Math.max(0, activePlatformIndex));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, activePlatformIndex]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (menuOpen) triggerRef.current?.focus();
        if (mobileOpen) mobileToggleRef.current?.focus();
        setMenuOpen(false);
        closeMobileMenu();
      }
      if (event.key === 'Tab' && mobileOpen) {
        const items = [...(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])]
          .filter((item) => item.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!platformRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    const desktop = window.matchMedia('(min-width: 1181px)');
    const onResize = () => {
      setMenuOpen(false);
      if (desktop.matches) closeMobileMenu();
    };
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onResize);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const background = document.querySelectorAll<HTMLElement>('main, .site-footer');
    background.forEach((element) => { element.inert = true; });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.body.style.overscrollBehavior = previousOverscroll;
      background.forEach((element) => { element.inert = false; });
      if (restoreScrollRef.current && window.scrollY !== scrollY) window.scrollTo(0, scrollY);
      restoreScrollRef.current = true;
    };
  }, [mobileOpen]);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}${mobileOpen ? ' site-header--menu-open' : ''}`} ref={headerRef}>
      <div className="site-header__inner">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className={`desktop-nav__link${isRouteActive(pathname, '/about') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/about') ? 'page' : undefined} to="/about">{t('nav.about')}</Link>
          <div className="platform-trigger" ref={platformRef} onMouseEnter={openMenu} onMouseLeave={scheduleClose} onBlur={() => {
            window.requestAnimationFrame(() => {
              if (!platformRef.current?.contains(document.activeElement)) setMenuOpen(false);
            });
          }}>
            <button className={platformIsActive ? 'is-active' : ''} ref={triggerRef} type="button" aria-expanded={menuOpen} aria-controls="platform-menu" onClick={() => setMenuOpen((value) => !value)} onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                openMenu();
                window.requestAnimationFrame(() => familyRefs.current[activeGroup]?.focus());
              }
            }}>
              {t('nav.platform')} <img src="/assets/figma/nav-chevron.svg" alt="" width="24" height="24" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div id="platform-menu" className="platform-menu" initial={{ opacity: 0, y: reducedMotion ? 0 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }} transition={motionTransition} onMouseEnter={openMenu}>
                  <div className="platform-menu__families" role="tablist" aria-orientation="vertical" aria-label={t('nav.platform')}>
                    {platformNavigation.map((group, index) => (
                      <button key={group.href} ref={(element) => { familyRefs.current[index] = element; }} id={`platform-family-${index}`} type="button" role="tab" aria-controls="platform-links" aria-selected={activeGroup === index} aria-current={activePlatformIndex === index ? 'true' : undefined} tabIndex={activeGroup === index ? 0 : -1} className={`platform-menu__family platform-menu__family--${group.accent}${activePlatformIndex === index ? ' is-route-active' : ''}`} onMouseEnter={() => setActiveGroup(index)} onFocus={() => setActiveGroup(index)} onClick={() => setActiveGroup(index)} onKeyDown={(event) => onFamilyKeyDown(event, index)}>
                        <span>{label(group.label)}</span><span aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                  <div id="platform-links" role="tabpanel" aria-labelledby={`platform-family-${activeGroup}`} className={`platform-menu__children platform-menu__children--${platformNavigation[activeGroup].accent}`}>
                    <p>{label(platformNavigation[activeGroup].label)}</p>
                    {platformNavigation[activeGroup].children.map((item) => {
                      const active = isRouteActive(pathname, item.href, { exact: true });
                      return <Link className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} key={item.href} to={item.href}>{label(item.label)} <span aria-hidden="true">↗</span></Link>;
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link className={`desktop-nav__link${isRouteActive(pathname, '/ventures') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/ventures') ? 'page' : undefined} to="/ventures">{t('nav.ventures')}</Link>
          <Link className={`desktop-nav__link${isRouteActive(pathname, '/insights') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/insights') ? 'page' : undefined} to="/insights">{t('nav.insights')}</Link>
        </nav>
        <div className="header-actions">
          <a className="client-link" href="#client-portal">{t('nav.clientPortal')}</a>
          <button className="pill-button pill-button--small" onClick={openModal}>{t('nav.startConversation')}</button>
        </div>
        <button ref={mobileToggleRef} className="mobile-toggle" type="button" aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={toggleMobileMenu}>
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label={t('nav.mobileNavigation')} initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }} transition={motionTransition}>
            <Link className={`mobile-nav__link${isRouteActive(pathname, '/about') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/about') ? 'page' : undefined} onClick={closeForNavigation} to="/about">{t('nav.about')}</Link>
            <button className={`mobile-nav__parent${platformIsActive ? ' is-active' : ''}`} type="button" aria-expanded={mobilePlatformOpen} aria-controls="mobile-platform-navigation" onClick={() => setMobilePlatformOpen((value) => !value)}>
              {t('nav.platform')} <img className="mobile-nav__chevron" src="/assets/figma/nav-chevron.svg" alt="" width="24" height="24" />
            </button>
            <AnimatePresence initial={false}>
              {mobilePlatformOpen && (
                <motion.div id="mobile-platform-navigation" className="mobile-platform-shell" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={accordionTransition}>
                  <div className="mobile-platform">
                    {platformNavigation.map((group, index) => (
                      <div className={activePlatformIndex === index ? 'is-route-active' : ''} key={group.href}>
                        <button type="button" aria-expanded={mobileGroup === group.href} aria-controls={`mobile-platform-group-${index}`} onClick={() => setMobileGroup((value) => value === group.href ? null : group.href)}>
                          {label(group.label)} <img className="mobile-nav__chevron" src="/assets/figma/nav-chevron.svg" alt="" width="24" height="24" />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileGroup === group.href && (
                            <motion.div id={`mobile-platform-group-${index}`} className="mobile-platform__group-children" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={accordionTransition}>
                              <div className="mobile-platform__children">{group.children.map((item) => {
                                const active = isRouteActive(pathname, item.href, { exact: true });
                                return <Link className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} onClick={closeForNavigation} key={item.href} to={item.href}>{label(item.label)}</Link>;
                              })}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Link className={`mobile-nav__link${isRouteActive(pathname, '/ventures') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/ventures') ? 'page' : undefined} onClick={closeForNavigation} to="/ventures">{t('nav.ventures')}</Link>
            <Link className={`mobile-nav__link${isRouteActive(pathname, '/insights') ? ' is-active' : ''}`} aria-current={isRouteActive(pathname, '/insights') ? 'page' : undefined} onClick={closeForNavigation} to="/insights">{t('nav.insights')}</Link>
            <a className="mobile-nav__link" href="#client-portal" onClick={() => closeMobileMenu()}>{t('nav.clientPortal')}</a>
            <button className="pill-button" onClick={() => { closeMobileMenu(); openModal(); }}>{t('nav.startConversation')}</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
