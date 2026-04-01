import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { LogoMark } from '../components/ui/LogoMark';
import { useTranslation } from '../i18n/useTranslation';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const DIVISIONS = [
  {
    to: '/consulting',
    titleKey: 'home.divisions.0.name',
    taglineKey: 'home.divisions.0.tagline',
    subtitleKey: 'home.divisions.0.subtitle',
    dark: false,
  },
  {
    to: '/construction',
    titleKey: 'home.divisions.1.name',
    taglineKey: 'home.divisions.1.tagline',
    subtitleKey: 'home.divisions.1.subtitle',
    dark: false,
  },
  {
    to: '/services',
    titleKey: 'home.divisions.2.name',
    taglineKey: 'home.divisions.2.tagline',
    subtitleKey: 'home.divisions.2.subtitle',
    dark: false,
  },
  {
    to: '/accelerator',
    titleKey: 'home.divisions.3.name',
    taglineKey: 'home.divisions.3.tagline',
    subtitleKey: 'home.divisions.3.subtitle',
    dark: true,
    featured: true,
  },
];

const EXPERTISE_TAB_DEFS = [
  { id: 'applications',  labelKey: 'home.innovativeSolutions.tabs.0.label', itemsKey: 'home.innovativeSolutions.tabs.0.items' },
  { id: 'methodologies', labelKey: 'home.innovativeSolutions.tabs.1.label', itemsKey: 'home.innovativeSolutions.tabs.1.items' },
  { id: 'industries',    labelKey: 'home.innovativeSolutions.tabs.2.label', itemsKey: 'home.innovativeSolutions.tabs.2.items' },
];

// Full-coverage 5-column mosaic — widths/heights tile exactly, +1px prevents sub-pixel gaps
// Col 1: 0–20%  |  Col 2: 20–40%  |  Col 3: 40–60%  |  Col 4: 60–80%  |  Col 5: 80–100%
const COLLAGE_IMAGES = [
  // ── Column 1 (left 20%) ─────────────────────────────────────────
  { id: '1518770660439-4636190af475', left: '0%',  top: '0%',  w: 'calc(20% + 1px)', h: 'calc(35% + 1px)' }, // circuit / tech
  { id: '1581091226825-a6a2a5aee158', left: '0%',  top: '35%', w: 'calc(20% + 1px)', h: 'calc(35% + 1px)' }, // engineer
  { id: '1519389950473-47ba0277781c', left: '0%',  top: '70%', w: 'calc(20% + 1px)', h: 'calc(30% + 1px)' }, // developer working

  // ── Column 2 (20–40%) ───────────────────────────────────────────
  { id: '1677442135703-1787eea5ce01', left: '20%', top: '0%',  w: 'calc(20% + 1px)', h: 'calc(42% + 1px)' }, // AI visualization
  { id: '1503387762-592deb58ef4e',   left: '20%',  top: '42%', w: 'calc(20% + 1px)', h: 'calc(33% + 1px)' }, // construction / arch
  { id: '1460925895917-afdab827c52f', left: '20%', top: '75%', w: 'calc(20% + 1px)', h: 'calc(25% + 1px)' }, // laptop typing

  // ── Column 3 (40–60%) ───────────────────────────────────────────
  { id: '1461749280684-dccba630e2f6', left: '40%', top: '0%',  w: 'calc(20% + 1px)', h: 'calc(38% + 1px)' }, // code / dev
  { id: '1552664730-d307ca884978',   left: '40%',  top: '38%', w: 'calc(20% + 1px)', h: 'calc(32% + 1px)' }, // consulting / strategy
  { id: '1486312338219-ce68d2c6f44d',left: '40%',  top: '70%', w: 'calc(20% + 1px)', h: 'calc(30% + 1px)' }, // laptop workspace

  // ── Column 4 (60–80%) ───────────────────────────────────────────
  { id: '1573164713988-8665fc963095', left: '60%', top: '0%',  w: 'calc(20% + 1px)', h: 'calc(45% + 1px)' }, // business meeting
  { id: '1558618666-fcd25c85cd64',   left: '60%',  top: '45%', w: 'calc(20% + 1px)', h: 'calc(30% + 1px)' }, // server / infra
  { id: '1486406146926-c627a92ad1ab',left: '60%',  top: '75%', w: 'calc(20% + 1px)', h: 'calc(25% + 1px)' }, // modern architecture

  // ── Column 5 (80–100%) ──────────────────────────────────────────
  { id: '1551288049-bebda4e38f71',   left: '80%',  top: '0%',  w: 'calc(20% + 1px)', h: 'calc(38% + 1px)' }, // data analytics
  { id: '1507003211169-0a1dd7228f2d', left: '80%', top: '38%', w: 'calc(20% + 1px)', h: 'calc(35% + 1px)' }, // programmer
  { id: '1522071820081-009f0129c71c', left: '80%', top: '73%', w: 'calc(20% + 1px)', h: 'calc(27% + 1px)' }, // office space
] as const;

// Flat logo mark for the Accelerator card — same pixel footprint as the other icons
function FlatLogoIcon() {
  const L =
    'M87.21 5.73L87.21 60.97C87.21 62.49 86.61 63.94 85.53 65.02' +
    'L12.01 138.24C10.93 139.31 10.33 140.77 10.33 142.29' +
    'L10.33 147.02C10.33 150.17 12.89 152.73 16.04 152.73' +
    'L81.49 152.73C84.64 152.73 87.2 155.29 87.2 158.44' +
    'L87.2 200.75C87.2 203.9 84.64 206.46 81.49 206.46' +
    'L40.85 206.46C39.29 206.46 37.8 205.82 36.73 204.7' +
    'L1.59 168.02C0.57 166.96 0 165.54 0 164.07' +
    'L0 81.52C0 80.01 0.6 78.55 1.67 77.48' +
    'L77.46 1.69C81.06-1.91 87.21 0.64 87.21 5.73Z';
  const R =
    'M0 5.73L0 60.97C0 62.49 0.6 63.94 1.68 65.02' +
    'L75.19 138.24C76.27 139.31 76.87 140.77 76.87 142.29' +
    'L76.87 147.02C76.87 150.17 74.31 152.73 71.16 152.73' +
    'L5.71 152.73C2.56 152.73 0 155.29 0 158.44' +
    'L0 200.75C0 203.9 2.56 206.46 5.71 206.46' +
    'L46.35 206.46C47.91 206.46 49.4 205.82 50.47 204.7' +
    'L85.62 168.03C86.64 166.97 87.21 165.55 87.21 164.08' +
    'L87.21 81.53C87.21 80.02 86.61 78.56 85.54 77.49' +
    'L9.75 1.69C6.15-1.91 0 0.64 0 5.73Z';
  return (
    <svg width={22} height={23} viewBox="0 0 197.51 206.45" fill="none" aria-hidden="true">
      <path d={L} fill="var(--text-secondary)" fillOpacity="0.7" />
      <g transform="translate(110.3,0)">
        <path d={R} fill="var(--text-secondary)" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

// Division-specific outlined icons
// Stroke uses var(--text-secondary) so it auto-adapts to light and dark mode.
function CardIcon({ index, featured }: { index: number; isDark: boolean; featured?: boolean }) {
  if (featured) return <FlatLogoIcon />;

  const sw = 1.45;

  const icons = [
    // 0 — Consulting: briefcase
    <svg key="consulting" width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h3A1.5 1.5 0 0 1 14 5.5V7"
        stroke="var(--text-secondary)" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      />
      <rect x="3" y="7" width="16" height="11" rx="1.6"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <line x1="3" y1="13" x2="19" y2="13"
        stroke="var(--text-secondary)" strokeWidth={sw * 0.7} strokeLinecap="round"
      />
    </svg>,

    // 1 — Construction: stacked layers (foundations / build-up)
    <svg key="construction" width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="7"   y="3.5" width="8"  height="3.5" rx="1"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <rect x="4.5" y="9"   width="13" height="3.5" rx="1"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <rect x="2"   y="14.5" width="18" height="3.5" rx="1"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
    </svg>,

    // 2 — Services: 2×2 app grid
    <svg key="services" width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3"  y="3"  width="7" height="7" rx="1.5"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <rect x="12" y="3"  width="7" height="7" rx="1.5"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <rect x="3"  y="12" width="7" height="7" rx="1.5"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
      <rect x="12" y="12" width="7" height="7" rx="1.5"
        stroke="var(--text-secondary)" strokeWidth={sw}
      />
    </svg>,
  ];

  return icons[index] ?? null;
}

export function Home() {
  const { t, tArray } = useTranslation();
  const { openModal } = useModal();
  const { lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState(EXPERTISE_TAB_DEFS[0].id);

  // Cursor-reveal collage — direct DOM update, no React state, native 60fps
  const collageRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!collageRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mask = `radial-gradient(circle 230px at ${x}px ${y}px, black 15%, transparent 100%)`;
    collageRef.current.style.maskImage = mask;
    collageRef.current.style.webkitMaskImage = mask;
  };

  const handleHeroMouseLeave = () => {
    if (!collageRef.current) return;
    const hidden = 'radial-gradient(circle 0px at -500px -500px, black 0%, transparent 100%)';
    collageRef.current.style.maskImage = hidden;
    collageRef.current.style.webkitMaskImage = hidden;
  };

  return (
    <PageTransition>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[96vh] flex flex-col justify-center overflow-hidden -mt-16"
        style={{ backgroundColor: 'var(--bg-primary)' }}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Layer 0a — image collage, revealed only at cursor position */}
        <div
          ref={collageRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: 'radial-gradient(circle 0px at -500px -500px, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle 0px at -500px -500px, black 0%, transparent 100%)',
          }}
        >
          {COLLAGE_IMAGES.map((img) => (
            <img
              key={img.id}
              src={`https://images.unsplash.com/photo-${img.id}?w=700&auto=format&fit=crop&q=75`}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute object-cover select-none"
              style={{ left: img.left, top: img.top, width: img.w, height: img.h }}
            />
          ))}
        </div>

        {/* Layer 0b — scrim: tints images toward bg-primary so text stays legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'var(--hero-scrim)' }}
        />

        {/* Layer 1 — radial ambient glow behind logo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              'radial-gradient(ellipse 60% 42% at 50% 16%, rgba(0,185,140,0.18) 0%, transparent 65%)',
              'radial-gradient(ellipse 40% 28% at 50% 12%, rgba(174,227,123,0.10) 0%, transparent 60%)',
            ].join(', '),
          }}
        />

        {/* Layer 2 — dot grid, masked so it fades out toward the bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.18,
            maskImage:
              'linear-gradient(to bottom, black 0%, black 40%, transparent 82%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 40%, transparent 82%)',
          }}
        />

        {/* Layer 3 — perspective concentric rings anchored to bottom-center */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden"
          style={{ height: '62%' }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 500"
            fill="none"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            <defs>
              {/* Fade: transparent at top → opaque at bottom, so rings emerge from the fold */}
              <linearGradient id="ring-fade" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="white" stopOpacity="0" />
                <stop offset="35%"  stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
              </linearGradient>
              <mask id="ring-mask">
                <rect width="1200" height="500" fill="url(#ring-fade)" />
              </mask>
            </defs>
            <g mask="url(#ring-mask)">
              {([
                [70,  0.70],
                [175, 0.55],
                [310, 0.40],
                [475, 0.28],
                [665, 0.18],
                [880, 0.10],
              ] as [number, number][]).map(([rx, op]) => (
                <ellipse
                  key={rx}
                  cx="600"
                  cy="500"
                  rx={rx}
                  ry={rx * 0.24}
                  stroke="var(--text-primary)"
                  strokeWidth="1.2"
                  opacity={op}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Layer 4 — bottom gradient fade to bg-secondary */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '45%',
            background:
              'linear-gradient(to bottom, var(--hero-fade) 0%, var(--bg-secondary) 100%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            {/* Logo Mark — hero with glow + mouse tracking */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <LogoMark size="xl" trackMouse />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] mb-5 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.hero.mainTitle')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-base text-[var(--text-secondary)] leading-relaxed mb-20 max-w-2xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('home.hero.description')}
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button variant="pill" size="md" onClick={openModal}>
                {t('common.scheduleDemo')} &nbsp;›
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Innovative Solutions ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <p
              className="text-xs text-[var(--text-secondary)] mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('home.innovativeSolutions.label')}
            </p>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {EXPERTISE_TAB_DEFS.map((tabDef) => {
                const isActive = activeTab === tabDef.id;
                return (
                  <button
                    key={tabDef.id}
                    onClick={() => setActiveTab(tabDef.id)}
                    className="px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B]"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: isActive ? 'var(--text-primary)' : 'transparent',
                      color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      border: `1px solid ${isActive ? 'var(--text-primary)' : 'var(--border-color)'}`,
                    }}
                  >
                    {t(tabDef.labelKey)}
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="mt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
              <AnimatePresence mode="wait">
                {EXPERTISE_TAB_DEFS.filter(tabDef => tabDef.id === activeTab).map((tabDef) => (
                  <motion.ul
                    key={tabDef.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="pt-5 flex flex-wrap justify-center gap-x-8 gap-y-3"
                  >
                    {tArray(tabDef.itemsKey).map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <span className="w-1 h-1 rounded-full bg-[#AEE37B] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Built for Companies ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-4"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.builtForCompanies.heading')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              {t('home.builtForCompanies.description')}
            </p>
          </motion.div>
        </div>

        {/* One Platform. Four Capabilities. */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm font-medium text-[var(--text-secondary)] mb-8 tracking-wide"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {t('home.builtForCompanies.platformLabel')}
          </motion.p>

          {/* 2×2 Platform Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {DIVISIONS.map((div, i) => {
              const isDark = div.dark;
              const cardBg = isDark ? 'var(--bg-dark-section)' : 'var(--bg-primary)';
              const titleColor = isDark ? '#FFFFFF' : 'var(--text-primary)';
              const tagColor = isDark ? 'rgba(255,255,255,0.55)' : 'var(--text-secondary)';

              const cardInner = (
                <div className="relative flex flex-col justify-between min-h-[200px] p-9">
                  {/* Accelerator shimmer overlay */}
                  {div.featured && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(0,185,140,0.12) 0%, rgba(0,185,140,0.04) 60%, transparent 100%)' }}
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center gap-2.5 mb-3">
                      <CardIcon index={i} isDark={isDark} featured={!!div.featured} />
                      <h3
                        className="text-base font-semibold"
                        style={{ fontFamily: 'var(--font-ui)', color: titleColor }}
                      >
                        {t(div.titleKey)}
                      </h3>
                      {div.featured && (
                        <span className="relative flex-shrink-0 w-1.5 h-1.5">
                          <span className="absolute inset-0 rounded-full bg-[#AEE37B] animate-ping opacity-70" />
                          <span className="relative block w-1.5 h-1.5 rounded-full bg-[#AEE37B]" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                      {t(div.subtitleKey)}
                    </p>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: tagColor, fontFamily: 'var(--font-body)' }}>
                      {t(div.taglineKey)}
                    </p>
                  </div>
                  {!div.featured && (
                    <span
                      className="text-xs font-medium text-[var(--accent-fg)] mt-6 group-hover:translate-x-1 transition-transform duration-200 inline-block"
                      style={{ fontFamily: 'var(--font-ui)' }}
                    >
                      {t('common.learnMore')} →
                    </span>
                  )}
                  {div.featured && (
                    <span className="text-[10px] font-medium tracking-widest uppercase text-[#AEE37B]/70 mt-6" style={{ fontFamily: 'var(--font-ui)' }}>
                      {t('common.comingSoon')}
                    </span>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={div.to}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group"
                  style={{ backgroundColor: cardBg }}
                >
                  {div.featured ? (
                    <div>{cardInner}</div>
                  ) : (
                    <Link to={div.to} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B]">
                      {cardInner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              to="/consulting"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.builtForCompanies.exploreLink')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Engineered for Precision ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[520px] lg:min-h-[580px]"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        {/* Background image — bleeds from right, feathered into text */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[88%] pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&auto=format&fit=crop&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.9 }}
          />
          {/* Mobile scrim — keeps text readable on small screens */}
          <div
            className="absolute inset-0 lg:hidden pointer-events-none"
            style={{ background: 'var(--bg-dark-section)', opacity: 0.88 }}
          />
          {/* Desktop left feather — wide bleed into text column */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none hidden lg:block"
            style={{
              width: '68%',
              background: 'linear-gradient(to right, var(--bg-dark-section) 0%, var(--bg-dark-section) 8%, transparent 100%)',
            }}
          />
          {/* Top feather */}
          <div
            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, var(--bg-dark-section) 0%, transparent 100%)' }}
          />
          {/* Bottom feather */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to top, var(--bg-dark-section) 0%, transparent 100%)' }}
          />
          {/* Right feather */}
          <div
            className="absolute inset-y-0 right-0 w-1/5 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-dark-section) 0%, transparent 100%)' }}
          />
          {/* Teal brand tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 65% 45%, rgba(0,185,140,0.12) 0%, transparent 75%)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Text content — sits above image */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white mb-5"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('home.precision.heading1')}<br />
                {t('home.precision.heading2Prefix')}
                <span style={{ color: 'var(--accent)' }}>{t('home.precision.heading2Accent')}</span>
              </h2>
              <p
                className="text-sm font-medium text-white/70 mb-3"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('home.precision.subtitle')}
              </p>
              <p
                className="text-sm text-white/50 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('home.precision.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Let's Build What's Next ───────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-8"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.letsBuild.heading')}
            </h2>

            {/* Tech tag chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-8">
              {tArray('home.letsBuild.techTags').map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full text-[var(--text-secondary)]"
                  style={{ border: '1px solid var(--border-color)', fontFamily: 'var(--font-ui)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#AEE37B] inline-block" />
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('home.letsBuild.description')}
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
