import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { LogoMark } from '../components/ui/LogoMark';
import { useTranslation } from '../i18n/useTranslation';

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
    dark: false,
  },
  {
    to: '/construction',
    titleKey: 'home.divisions.1.name',
    taglineKey: 'home.divisions.1.tagline',
    dark: true,
  },
  {
    to: '/services',
    titleKey: 'home.divisions.2.name',
    taglineKey: 'home.divisions.2.tagline',
    dark: false,
  },
  {
    to: '/accelerator',
    titleKey: 'home.divisions.3.name',
    taglineKey: 'home.divisions.3.tagline',
    dark: true,
    featured: true,
  },
];

const EXPERTISE_TABS = [
  {
    id: 'applications',
    label: 'Advanced Applications',
    items: ['AI & Machine Learning', 'IoT & Smart Systems', 'Robotics & Automation', 'Data Analytics & Visualization'],
  },
  {
    id: 'methodologies',
    label: 'Engineering Methodologies',
    items: ['Systems Engineering', 'Agile & Iterative Development', 'Model-Based Design', 'Lean Process Engineering'],
  },
  {
    id: 'industries',
    label: 'Industries We Support',
    items: ['Energy & Infrastructure', 'Healthcare Technology', 'Defense & Aerospace', 'Manufacturing & Supply Chain'],
  },
];

const TECH_TAGS = [
  'Artificial Intelligence',
  'Embedded Systems',
  'Control Engineering',
  'Digital Infrastructure',
];

// Full-coverage 4-column mosaic — widths/heights tile exactly, +1px prevents sub-pixel gaps
// Col 1: 0–22%  |  Col 2: 22–48%  |  Col 3: 48–76%  |  Col 4: 76–100%
const COLLAGE_IMAGES = [
  // ── Column 1 (left 22%) ─────────────────────────────────────────
  { id: '1518770660439-4636190af475', left: '0%',   top: '0%',   w: 'calc(22% + 1px)', h: 'calc(37% + 1px)' }, // circuit / tech
  { id: '1503387762-592deb58ef4e',   left: '0%',   top: '37%',  w: 'calc(22% + 1px)', h: 'calc(34% + 1px)' }, // construction / arch
  { id: '1581091226825-a6a2a5aee158',left: '0%',   top: '71%',  w: 'calc(22% + 1px)', h: 'calc(29% + 1px)' }, // engineering precision

  // ── Column 2 (22–48%) ───────────────────────────────────────────
  { id: '1677442135703-1787eea5ce01', left: '22%', top: '0%',   w: 'calc(26% + 1px)', h: 'calc(53% + 1px)' }, // AI / data visualization
  { id: '1552664730-d307ca884978',   left: '22%',  top: '53%',  w: 'calc(26% + 1px)', h: 'calc(47% + 1px)' }, // consulting / strategy

  // ── Column 3 (48–76%) ───────────────────────────────────────────
  { id: '1461749280684-dccba630e2f6', left: '48%', top: '0%',   w: 'calc(28% + 1px)', h: 'calc(42% + 1px)' }, // code / dev
  { id: '1558618666-fcd25c85cd64',   left: '48%',  top: '42%',  w: 'calc(28% + 1px)', h: 'calc(31% + 1px)' }, // server / infra
  { id: '1486312338219-ce68d2c6f44d',left: '48%',  top: '73%',  w: 'calc(28% + 1px)', h: 'calc(27% + 1px)' }, // laptop / workspace

  // ── Column 4 (76–100%) ──────────────────────────────────────────
  { id: '1573164713988-8665fc963095', left: '76%', top: '0%',   w: 'calc(24% + 1px)', h: 'calc(36% + 1px)' }, // business meeting
  { id: '1551288049-bebda4e38f71',   left: '76%',  top: '36%',  w: 'calc(24% + 1px)', h: 'calc(33% + 1px)' }, // data analytics
  { id: '1486406146926-c627a92ad1ab',left: '76%',  top: '69%',  w: 'calc(24% + 1px)', h: 'calc(31% + 1px)' }, // modern architecture
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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(EXPERTISE_TABS[0].id);

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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] mb-5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              A Technology-First<br />
              Advisory &amp; Execution Platform
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-base text-[var(--text-secondary)] leading-relaxed mb-20"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('home.hero.description')}
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button variant="pill" size="md">
                Explore Platform &nbsp;›
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
              Innovative Solutions for Complex Challenges
            </p>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {EXPERTISE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B]"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      backgroundColor: isActive ? 'var(--text-primary)' : 'transparent',
                      color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      border: `1px solid ${isActive ? 'var(--text-primary)' : 'var(--border-color)'}`,
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="mt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
              <AnimatePresence mode="wait">
                {EXPERTISE_TABS.filter(t => t.id === activeTab).map((tab) => (
                  <motion.ul
                    key={tab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="pt-5 flex flex-wrap justify-center gap-x-8 gap-y-3"
                  >
                    {tab.items.map((item) => (
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
              Built for Companies That Move Forward
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Gradum brings together technology, engineering, and business execution into a single platform.
              We partner with organizations to solve complex challenges and deliver scalable, real-world outcomes.
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
            One Platform. Four Capabilities.
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
                      {/* division subtitle from Figma */}
                      {i === 0 && 'Advanced Technology & Engineering Advisory'}
                      {i === 1 && 'Engineering, Architecture & Build'}
                      {i === 2 && 'Business Operations & Growth Services'}
                      {i === 3 && 'Startup Development & Venture Growth'}
                    </p>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: tagColor, fontFamily: 'var(--font-body)' }}>
                      {t(div.taglineKey)}
                    </p>
                  </div>
                  {!div.featured && (
                    <span
                      className="text-xs font-medium text-[#AEE37B] mt-6 group-hover:translate-x-1 transition-transform duration-200 inline-block"
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
              Explore Each Platform ›
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Engineered for Precision ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-semibold leading-tight text-white mb-5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Gradum is not built for volume.<br />
              It is{' '}
              <span style={{ color: 'var(--accent)' }}>engineered for precision.</span>
            </h2>
            <p
              className="text-sm font-medium text-white/70 mb-3"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Where Advisory Meets Execution
            </p>
            <p
              className="text-sm text-white/50 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              From tense iterations to execution margins, across industry, expertise, nerve, and more —
              we design, build, and continuously improve what matters.
            </p>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Image + feathered overlay stack */}
            <div className="relative w-full aspect-4/3 overflow-hidden">
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&auto=format&fit=crop&q=80"
                alt="Engineer at work"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.75 }}
              />

              {/* Feather left — bleeds into the text column */}
              <div
                className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, var(--bg-dark-section) 0%, transparent 100%)',
                }}
              />

              {/* Feather top */}
              <div
                className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, var(--bg-dark-section) 0%, transparent 100%)',
                }}
              />

              {/* Feather bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, var(--bg-dark-section) 0%, transparent 100%)',
                }}
              />

              {/* Feather right */}
              <div
                className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to left, var(--bg-dark-section) 0%, transparent 100%)',
                }}
              />

              {/* Subtle teal tint overlay — ties photo into brand palette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 70% at 60% 40%, rgba(0,185,140,0.10) 0%, transparent 75%)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </motion.div>
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
              Let's Build What's Next
            </h2>

            {/* Tech tag chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-8">
              {TECH_TAGS.map(tag => (
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
              Our work spans advanced domains including artificial intelligence, embedded systems, control engineering,
              and digital infrastructure. We apply precision, agility, and patience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        className="py-14"
        style={{ backgroundColor: 'var(--bg-dark-section)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <LogoMark size="sm" glow={false} />
              <span
                className="text-base font-semibold text-white"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                Gradum Group
              </span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Miami, FL (USA)<br />
              Santo Domingo (Dominican Republic)
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            {/* Language links */}
            <div className="flex items-center gap-3 text-xs font-medium text-white/40" style={{ fontFamily: 'var(--font-ui)' }}>
              <button className="hover:text-white transition-colors duration-200">ES</button>
              <span>|</span>
              <button className="hover:text-white transition-colors duration-200">EN</button>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-white/40 hover:text-white transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-white/40 hover:text-white transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M8 11v5M8 8v.5M12 16v-5M12 11a3 3 0 0 1 6 0v5M18 11v5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </PageTransition>
  );
}
