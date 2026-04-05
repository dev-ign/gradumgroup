import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../i18n/useTranslation';

export function Consulting() {
  const { openModal } = useModal();
  const { theme } = useTheme();
  const { t, tArray, tRaw } = useTranslation();
  const complexityPills = tArray('consulting.complexity.pills');
  const insightCards = tRaw<{ title: string; img: string }[]>('consulting.insights.cards') ?? [];
  const whereWeOperateLinks = tRaw<{ label: string }[]>('consulting.whereWeOperate.links') ?? [];
  const lightModeLabelColor = '#4F6F16';
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  // Section 3 — scroll-driven card focus
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardSectionRef,
    offset: ['start start', 'end end'],
  });
  const [activeCard, setActiveCard] = useState(0);
  const [cardScrollRaw, setCardScrollRaw] = useState(0);
  useMotionValueEvent(cardScroll, 'change', (latest) => {
    setCardScrollRaw(latest);
    setActiveCard(Math.min(2, Math.floor(latest * 3)));
  });

  // Below lg (1024px) buttons are hidden — disable scroll animation and show all cards at full scale
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Background image — expands from 50% → 100% width and fades in as user scrolls toward card 3
  const bgImageOpacity = useTransform(cardScroll, [0, 1], [0.06, 0.30]);
  const bgImageWidth   = useTransform(cardScroll, [0, 1], ['50%', '60%']);

  // Per-card scale: active card starts at 1.10, shrinks to 1.04 as segment completes
  const getCardScale = (i: number) => {
    if (activeCard !== i) return 0.88;
    const segProgress = Math.max(0, Math.min(1, (cardScrollRaw - i / 3) * 3));
    return 1.10 - segProgress * 0.06;
  };

  // Orb button navigation
  const [upHover, setUpHover] = useState(false);
  const [downHover, setDownHover] = useState(false);

  const handleUp = () => {
    const el = cardSectionRef.current;
    if (!el) return;
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, absoluteTop - window.innerHeight), behavior: 'smooth' });
  };

  const handleDown = () => {
    const el = cardSectionRef.current;
    if (!el) return;
    const absoluteBottom = el.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: absoluteBottom, behavior: 'smooth' });
  };

  // Unsplash images per "Where We Operate" link — revealed on hover
  const whereWeOperateImages = [
    '1551434678-e076c223a692',     // Applications — people at workstations/engineering software
    '1531973576160-7125cd663d86',  // Methodologies — strategy whiteboard/process
    '1497366216548-37526070297c',  // Industries — industrial/infrastructure environment
  ];

  return (
    <PageTransition>

      {/* ── Section 1: Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[600px] lg:min-h-[680px] flex items-center"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        {/* Background image — right side, feathered leftward */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[75%] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.55 }}
          />
          {/* Mobile scrim */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{ backgroundColor: 'var(--bg-dark-section)', opacity: 0.88 }}
          />
          {/* Left feather — wide, keeps text column fully clear */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block"
            style={{
              width: '72%',
              background: 'linear-gradient(to right, var(--bg-dark-section) 0%, var(--bg-dark-section) 15%, transparent 100%)',
            }}
          />
          {/* Top feather */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Bottom feather */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to top, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Right feather */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: '12%',
              background: 'linear-gradient(to left, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Brand tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,185,140,0.10) 0%, transparent 75%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-36 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-6"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('consulting.hero.label')}
              </p>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white mb-8"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('consulting.hero.title')}
              </h1>
              <p
                className="text-base text-white/50 leading-relaxed mb-10 max-w-xl"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('consulting.hero.description')}
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center rounded-full border border-white/60 text-white font-semibold text-base px-7 py-3 hover:bg-white hover:text-[#0D2B26] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B] focus-visible:ring-offset-2"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('consulting.hero.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Where We Operate ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Background images — one per link, crossfade on hover */}
        {whereWeOperateImages.map((imgId, i) => (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: hoveredLink === i ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <img
              src={`https://images.unsplash.com/photo-${imgId}?w=1400&auto=format&fit=crop&q=80`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ opacity: 0.42 }}
            />
            {/* Four-edge feather */}
            <div
              className="absolute inset-0"
              style={{
                background: [
                  'linear-gradient(to bottom, var(--bg-secondary) 0%, transparent 28%)',
                  'linear-gradient(to top, var(--bg-secondary) 0%, transparent 28%)',
                  'linear-gradient(to right, var(--bg-secondary) 0%, transparent 22%)',
                  'linear-gradient(to left, var(--bg-secondary) 0%, transparent 22%)',
                ].join(', '),
              }}
            />
            {/* Radial center softener — protects text zone at center */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 10%, var(--bg-secondary) 85%)',
              }}
            />
          </div>
        ))}

        {/* Content — centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-8"
              style={{ fontFamily: 'var(--font-ui)', color: theme === 'light' ? lightModeLabelColor : '#AEE37B' }}
            >
              {t('consulting.whereWeOperate.label')}
            </p>

            {/* Pill links */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {whereWeOperateLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <Link
                    to="/consulting"
                    onMouseEnter={() => setHoveredLink(i)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-transparent"
                    style={{
                      border: '1.5px solid var(--border-color)',
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    {link.label}
                    <span
                      className="text-[#AEE37B] text-xs leading-none transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <p
              className="text-base text-[var(--text-primary)] leading-relaxed max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                textShadow: '0 0 16px var(--bg-secondary), 0 0 32px var(--bg-secondary), 0 0 48px var(--bg-secondary)',
              }}
            >
              {t('consulting.whereWeOperate.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Advisory Cards ────────────────────────────────────── */}
      {/* 400vh wrapper → 300vh of effective scroll → 100vh per card step */}
      <div ref={cardSectionRef} className="lg:h-[400vh]">
        <section
          className="relative pt-12 pb-6 lg:py-0 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          {/* Background image — right side, expands 50%→100% and fades in with scroll */}
          <motion.div
            className="absolute inset-y-0 right-0 pointer-events-none hidden lg:block overflow-hidden"
            style={{ width: bgImageWidth }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&auto=format&fit=crop&q=75"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-left"
              style={{ opacity: bgImageOpacity }}
            />
            <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: '80%', background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)' }} />
            <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '33%', background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '33%', background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }} />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full lg:-mt-12">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 max-w-2xl"
            >
              <p
                className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4"
                style={{ fontFamily: 'var(--font-ui)', color: theme === 'light' ? lightModeLabelColor : '#AEE37B' }}
              >
                {t('consulting.advisory.label')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-4" style={{ fontFamily: 'var(--font-ui)' }}>
                {t('consulting.advisory.heading')}
              </h2>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {t('consulting.advisory.intro')}
              </p>
            </motion.div>

            {/*
              3-card grid — gap-px divider lines stay fixed because the outer <div>
              cell holds bg-primary at full size; only the inner motion.div scales.
            */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-8" style={{ backgroundColor: 'var(--border-color)' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <motion.div
                    animate={{
                      scale: isMobile ? 1.0 : getCardScale(i),
                      opacity: isMobile ? 1 : (activeCard === i ? 1 : 0.38),
                    }}
                    initial={{
                      scale: isMobile ? 1.0 : (i === 0 ? 1.10 : 0.88),
                      opacity: isMobile ? 1 : (i === 0 ? 1 : 0.38),
                    }}
                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="p-8 h-full"
                    style={{ transformOrigin: 'center center' }}
                  >
                    <div className="w-6 h-0.5 bg-[#AEE37B] mb-6" />
                    <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)] mb-3" style={{ fontFamily: 'var(--font-ui)' }}>
                      {t(`consulting.advisory.items.${i}.title`)}
                    </h3>
                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                      {t(`consulting.advisory.items.${i}.desc`)}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button onClick={openModal} size="lg" variant="outline">
              {t('consulting.advisory.cta')}
            </Button>
          </div>

          {/* Gradient Orb arrow buttons — grouped center-right, desktop only (lg+)
              z-50 keeps them above the fixed navbar (z-40).
              top-1/2 -translate-y-1/2 centers them in the sticky h-screen section,
              well below the 80px navbar so the up arrow is never hidden behind it. */}
          <div className="hidden lg:flex flex-col gap-3 absolute right-6 z-50"
            style={{ top: '50%', transform: 'translateY(-50%)', gap: '360px' }}>

            {/* Up arrow */}
            <button
              onClick={handleUp}
              onMouseEnter={() => setUpHover(true)}
              onMouseLeave={() => setUpHover(false)}
              aria-label="Previous section"
              className="flex items-center justify-center w-11 h-11 rounded-full select-none cursor-pointer"
              style={{
                background: theme === 'dark'
                  ? upHover
                    ? 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.52) 0%, rgba(10,41,36,0.96) 68%)'
                    : 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.30) 0%, rgba(10,41,36,0.92) 68%)'
                  : upHover
                    ? 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.55) 0%, rgba(240,246,244,0.98) 68%)'
                    : 'radial-gradient(circle at 35% 32%, rgba(10,41,36,0.18) 0%, rgba(240,246,244,0.95) 68%)',
                border: theme === 'dark'
                  ? upHover ? '1px solid rgba(174,227,123,0.50)' : '1px solid rgba(174,227,123,0.38)'
                  : upHover ? '1px solid rgba(174,227,123,0.60)' : '1px solid rgba(10,41,36,0.18)',
                boxShadow: theme === 'dark'
                  ? upHover
                    ? '0 4px 28px rgba(0,0,0,0.55), 0 0 0 7px rgba(174,227,123,0.11), inset 0 1px 0 rgba(174,227,123,0.20)'
                    : '0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(174,227,123,0.15)'
                  : upHover
                    ? '0 4px 24px rgba(10,41,36,0.15), 0 0 0 7px rgba(174,227,123,0.12), inset 0 1px 0 rgba(255,255,255,0.90)'
                    : '0 4px 18px rgba(10,41,36,0.12), inset 0 1px 0 rgba(255,255,255,0.35)',
                color: theme === 'dark' ? '#AEE37B' : upHover ? '#0A2924' : '#0D4030',
                transform: upHover ? 'scale(1.14)' : 'scale(1)',
                transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Down arrow */}
            <button
              onClick={handleDown}
              onMouseEnter={() => setDownHover(true)}
              onMouseLeave={() => setDownHover(false)}
              aria-label="Next section"
              className="flex items-center justify-center w-11 h-11 rounded-full select-none cursor-pointer"
              style={{
                background: theme === 'dark'
                  ? downHover
                    ? 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.52) 0%, rgba(10,41,36,0.96) 68%)'
                    : 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.30) 0%, rgba(10,41,36,0.92) 68%)'
                  : downHover
                    ? 'radial-gradient(circle at 35% 32%, rgba(174,227,123,0.55) 0%, rgba(240,246,244,0.98) 68%)'
                    : 'radial-gradient(circle at 35% 32%, rgba(10,41,36,0.18) 0%, rgba(240,246,244,0.95) 68%)',
                border: theme === 'dark'
                  ? downHover ? '1px solid rgba(174,227,123,0.50)' : '1px solid rgba(174,227,123,0.38)'
                  : downHover ? '1px solid rgba(174,227,123,0.60)' : '1px solid rgba(10,41,36,0.18)',
                boxShadow: theme === 'dark'
                  ? downHover
                    ? '0 4px 28px rgba(0,0,0,0.55), 0 0 0 7px rgba(174,227,123,0.11), inset 0 1px 0 rgba(174,227,123,0.20)'
                    : '0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(174,227,123,0.15)'
                  : downHover
                    ? '0 4px 24px rgba(10,41,36,0.15), 0 0 0 7px rgba(174,227,123,0.12), inset 0 1px 0 rgba(255,255,255,0.90)'
                    : '0 4px 18px rgba(10,41,36,0.12), inset 0 1px 0 rgba(255,255,255,0.35)',
                color: theme === 'dark' ? '#AEE37B' : downHover ? '#0A2924' : '#0D4030',
                transform: downHover ? 'scale(1.14)' : 'scale(1)',
                transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>
      </div>

      {/* ── Section 4: Built for Complexity ─────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[480px] lg:min-h-[540px] flex items-center"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        {/* Background image — left side, feathered rightward */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[70%] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-right"
            style={{ opacity: 0.60 }}
          />
          {/* Mobile scrim */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{ backgroundColor: 'var(--bg-dark-section)', opacity: 0.88 }}
          />
          {/* Right feather — bleeds into text column */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none hidden lg:block"
            style={{
              width: '70%',
              background: 'linear-gradient(to left, var(--bg-dark-section) 0%, var(--bg-dark-section) 10%, transparent 100%)',
            }}
          />
          {/* Top feather */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Bottom feather */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: '40%',
              background: 'linear-gradient(to top, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Left feather */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: '12%',
              background: 'linear-gradient(to right, var(--bg-dark-section) 0%, transparent 100%)',
            }}
          />
          {/* Accent tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,185,140,0.10) 0%, transparent 75%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Text content — right-aligned on desktop */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 w-full">
          <div className="lg:ml-auto lg:max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-5"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('consulting.complexity.label')}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold leading-[1.1] text-white mb-6"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('consulting.complexity.heading')}
              </h2>
              <p
                className="text-[15px] text-white/50 leading-relaxed mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('consulting.complexity.description')}
              </p>

              {/* Capability pills */}
              <div className="flex flex-col gap-3">
                {complexityPills.map((pill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
                    style={{
                      border: '1px solid rgba(174,227,123,0.25)',
                      backgroundColor: 'rgba(174,227,123,0.06)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE37B] shrink-0" />
                    <span
                      className="text-sm font-medium text-white/85"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {pill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Technical Insights ───────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p
              className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4"
              style={{ fontFamily: 'var(--font-ui)', color: theme === 'light' ? lightModeLabelColor : '#AEE37B' }}
            >
              {t('consulting.insights.label')}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] max-w-2xl"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('consulting.insights.heading')}
            </h2>
          </motion.div>

          {/* 3-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {insightCards.map((card, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B]"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                {/* Image thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${card.img}?w=700&auto=format&fit=crop&q=75`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {theme !== 'light' && (
                    <div
                      className="absolute inset-x-0 bottom-0 pointer-events-none"
                      style={{
                        height: '50%',
                        background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
                      }}
                    />
                  )}
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3
                    className="text-base font-semibold tracking-tight text-[var(--text-primary)] mb-4 leading-snug group-hover:text-[#AEE37B] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    {card.title}
                  </h3>
                  <span
                    className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-ui)' }}
                  >
                    Read More →
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Final CTA ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 lg:py-36"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        {/* Subtle ambient background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.12 }}
          />
          {/* Four-direction feather + radial center mask */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                'linear-gradient(to bottom, var(--bg-dark-section) 0%, transparent 30%)',
                'linear-gradient(to top, var(--bg-dark-section) 0%, transparent 30%)',
                'linear-gradient(to right, var(--bg-dark-section) 0%, transparent 25%)',
                'linear-gradient(to left, var(--bg-dark-section) 0%, transparent 25%)',
              ].join(', '),
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, var(--bg-dark-section) 85%)',
            }}
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('consulting.cta.label')}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-6 max-w-2xl mx-auto leading-[1.1]"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('consulting.cta.heading')}
            </h2>
            <p
              className="text-[15px] text-white/45 leading-relaxed mb-10 max-w-lg mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('consulting.cta.description')}
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center rounded-full border border-white/60 text-white font-semibold text-base px-7 py-3 hover:bg-white hover:text-[#0D2B26] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B] focus-visible:ring-offset-2"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('consulting.cta.cta')}
            </button>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  );
}
