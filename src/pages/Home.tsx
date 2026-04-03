import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { LogoMark } from '../components/ui/LogoMark';
import { useTranslation } from '../i18n/useTranslation';
import { useModal } from '../context/ModalContext';

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
    imgId: '1573164713988-8665fc963095',
  },
  {
    to: '/construction',
    titleKey: 'home.divisions.1.name',
    taglineKey: 'home.divisions.1.tagline',
    subtitleKey: 'home.divisions.1.subtitle',
    dark: false,
    imgId: '1486406146926-c627a92ad1ab',
  },
  {
    to: '/services',
    titleKey: 'home.divisions.2.name',
    taglineKey: 'home.divisions.2.tagline',
    subtitleKey: 'home.divisions.2.subtitle',
    dark: false,
    imgId: '1460925895917-afdab827c52f',
  },
  {
    to: '/accelerator',
    titleKey: 'home.divisions.3.name',
    taglineKey: 'home.divisions.3.tagline',
    subtitleKey: 'home.divisions.3.subtitle',
    dark: true,
    featured: true,
    imgId: '1677442135703-1787eea5ce01',
  },
];

// Brand SVG icons — paths inlined, fill="currentColor" for theme adaptability
function CardIcon({ index }: { index: number }) {
  const ICONS: { vb: string; paths: string[] }[] = [
    // 0 — Consulting
    { vb: '0 0 440.28 432.01', paths: ['M428.57,253.1h-86.8c-6.47,0-11.71,5.24-11.71,11.71v134.29c0,6.47-5.24,11.71-11.71,11.71h-9.73c-3.12,0-6.11-1.25-8.31-3.46l-7.19-7.25-50.79-50.99c-12.23-12.28-32.12-12.28-44.36,0l-50.78,50.99-7.23,7.26c-2.2,2.21-5.18,3.45-8.3,3.45h-9.7c-6.47,0-11.71-5.24-11.71-11.71v-134.29c0-6.47-5.24-11.71-11.71-11.71H11.72C5.25,253.1,0,258.34,0,264.81v83.37c0,3.21,1.3,6.26,3.61,8.46l75.26,72.11c2.18,2.09,5.09,3.26,8.11,3.26h96.97s72.38,0,72.38,0h97c3.02,0,5.91-1.17,8.11-3.26l75.24-72.11c2.3-2.21,3.6-5.26,3.6-8.45v-83.39c0-6.47-5.24-11.71-11.71-11.71Z', 'M436.68,75.37L361.41,3.26C359.24,1.17,356.32,0,353.3,0h-96.97s-72.38,0-72.38,0h-97c-3.02,0-5.91,1.17-8.11,3.26L3.61,75.37C1.3,77.57,0,80.62,0,83.83v83.38c0,6.47,5.24,11.71,11.71,11.71h86.8c6.47,0,11.71-5.24,11.71-11.71V32.92c0-6.47,5.24-11.71,11.71-11.71h9.74c3.11,0,6.09,1.24,8.28,3.45l7.21,7.26,50.78,50.98c12.23,12.28,32.12,12.28,44.36,0l50.78-50.98,7.23-7.26c2.2-2.21,5.18-3.45,8.3-3.45h9.7c6.47,0,11.71,5.24,11.71,11.71v134.29c0,6.47,5.24,11.71,11.71,11.71h86.82c6.47,0,11.71-5.24,11.71-11.71v-83.38c0-3.21-1.3-6.25-3.6-8.45Z'] },
    // 1 — Construction
    { vb: '0 0 595.3 341.98', paths: ['M9.91,151.01h73.25c5.47,0,9.91-4.44,9.91-9.91V27.75c0-5.39,4.36-9.83,9.83-9.83h8.24c2.62,0,5.15,1.03,6.98,2.85l119.78,120.34,6.98,6.98c1.9,1.82,4.36,2.93,6.98,2.93h69.12c5.47,0,9.91-4.44,9.91-9.91V27.75c0-5.39,4.44-9.83,9.91-9.83h8.17c2.62,0,5.15,1.03,6.98,2.85l126.84,127.31c1.82,1.82,4.36,2.93,6.98,2.93h95.6c8.88,0,13.24-10.7,7.06-16.89L461.13,2.93c-1.82-1.9-4.36-2.93-6.98-2.93h-142.93c-2.54,0-5,.95-6.82,2.77l-41.54,39.72h0S223.31,2.93,223.31,2.93c-1.82-1.9-4.36-2.93-6.98-2.93H73.41c-2.54,0-5,.95-6.82,2.77L3.09,63.58c-1.98,1.9-3.09,4.44-3.09,7.13v70.39c0,5.47,4.44,9.91,9.91,9.91Z', 'M585.35,190.97h-95.6c-2.62,0-5.15,1.03-6.98,2.93l-126.84,127.23c-1.82,1.9-4.36,2.93-6.98,2.93h-8.17c-5.47,0-9.91-4.44-9.91-9.91v-113.28c0-5.47-4.44-9.91-9.91-9.91h-69.12c-2.62,0-5.07,1.03-6.98,2.93l-6.98,6.98-119.78,120.26c-1.82,1.9-4.36,2.93-6.98,2.93h-8.24c-5.47,0-9.83-4.44-9.83-9.91v-113.28c0-5.47-4.44-9.91-9.91-9.91H9.91c-5.47,0-9.91,4.44-9.91,9.91v70.32c0,2.7,1.11,5.31,3.09,7.13l63.5,60.88c1.82,1.74,4.28,2.77,6.82,2.77h142.93c2.62,0,5.15-1.03,6.98-2.93l39.64-39.64h0l41.46,39.8c1.82,1.74,4.28,2.77,6.82,2.77h142.93c2.62,0,5.15-1.03,6.98-2.93l131.28-131.2c6.19-6.26,1.82-16.89-7.06-16.89Z'] },
    // 2 — Services
    { vb: '0 0 416.12 398.11', paths: ['M404.58,175.78h-111.34c-3.06,0-6-1.22-8.16-3.39L137.5,24.22c-2.16-2.17-5.1-3.39-8.16-3.39h-9.53c-6.36,0-11.51,5.15-11.51,11.51v131.93c0,6.36-5.15,11.51-11.51,11.51H11.51c-6.36,0-11.51-5.15-11.51-11.51v-81.91c0-3.14,1.28-6.14,3.55-8.31L77.47,3.2c2.14-2.05,5-3.2,7.97-3.2h166.39c3.05,0,5.98,1.21,8.14,3.37l152.76,152.76c7.25,7.25,2.12,19.65-8.14,19.65Z', 'M11.54,222.33h111.34c3.06,0,6,1.22,8.16,3.39l147.58,148.18c2.16,2.17,5.1,3.39,8.16,3.39h9.53c6.36,0,11.51-5.15,11.51-11.51v-131.93c0-6.36,5.15-11.51,11.51-11.51h85.28c6.36,0,11.51,5.15,11.51,11.51v81.91c0,3.14-1.28,6.14-3.55,8.31l-73.92,70.85c-2.14,2.05-5,3.2-7.97,3.2h-166.39c-3.05,0-5.98-1.21-8.14-3.37L3.39,241.98c-7.25-7.25-2.12-19.65,8.14-19.65Z'] },
    // 3 — Accelerator
    { vb: '0 0 362.16 538.34', paths: ['M163.91,10.76v103.83c0,2.85-1.14,5.59-3.16,7.61L22.58,259.8c-2.02,2.01-3.16,4.75-3.16,7.61v8.89c0,5.93,4.81,10.73,10.73,10.73h123.02c5.93,0,10.73,4.81,10.73,10.73v79.52c0,5.93-4.81,10.73-10.73,10.73h-76.38c-2.93,0-5.73-1.19-7.75-3.31L2.98,315.78c-1.92-2-2.98-4.66-2.98-7.43v-155.15c0-2.85,1.13-5.58,3.14-7.59L145.59,3.17c6.76-6.76,18.33-1.97,18.33,7.59Z', 'M198.24,527.58v-103.83c0-2.85,1.14-5.59,3.16-7.61l138.17-137.62c2.02-2.01,3.16-4.75,3.16-7.61v-8.89c0-5.93-4.81-10.73-10.73-10.73h-123.02c-5.93,0-10.73-4.81-10.73-10.73v-79.52c0-5.93,4.81-10.73,10.73-10.73h76.38c2.93,0,5.73,1.19,7.75,3.31l66.06,68.93c1.92,2,2.98,4.66,2.98,7.43v155.15c0,2.85-1.13,5.58-3.14,7.59l-142.44,142.44c-6.76,6.76-18.33,1.97-18.33-7.59Z'] },
  ];
  const icon = ICONS[index];
  if (!icon) return null;
  return (
    <svg height={22} viewBox={icon.vb} fill="currentColor" aria-hidden="true" style={{ width: 'auto', flexShrink: 0 }}>
      {icon.paths.map((d, pi) => <path key={pi} d={d} />)}
    </svg>
  );
}

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

export function Home() {
  const { t, tArray } = useTranslation();
  const { openModal } = useModal();

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
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[var(--text-primary)] mb-6 whitespace-pre-line"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.hero.mainTitle')}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed mb-20 max-w-2xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {t('home.hero.description')}
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center rounded-full bg-[#AEE37B] text-[#0A2924] font-bold text-2xl px-10 py-4 hover:bg-[#c8f090] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(174,227,123,0.3)] hover:shadow-[0_0_50px_rgba(174,227,123,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B] focus-visible:ring-offset-2 tracking-wide"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('home.hero.cta')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Built for Teams Operating at Scale ──────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)] mb-6"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {t('home.innovativeSolutions.label')}
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>
              {t('home.innovativeSolutions.intro1')}
            </p>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              {t('home.innovativeSolutions.intro2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── One Platform. Four Capabilities. ────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
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
                <div className="relative flex flex-col justify-between min-h-[240px] p-9 overflow-hidden">
                  {/* Hover background image */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <img
                      src={`https://images.unsplash.com/photo-${div.imgId}?w=700&auto=format&fit=crop&q=70`}
                      alt=""
                      className="absolute right-0 top-0 h-full w-3/5 object-cover object-left"
                    />
                    <div
                      className="absolute right-0 top-0 h-full w-3/5 pointer-events-none"
                      style={{ background: `linear-gradient(to right, ${cardBg} 0%, ${cardBg} 25%, transparent 100%)` }}
                    />
                  </div>
                  {div.featured && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(0,185,140,0.14) 0%, rgba(0,185,140,0.05) 60%, transparent 100%)' }}
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div style={{ color: isDark ? 'rgba(174,227,123,0.75)' : 'var(--text-secondary)', opacity: 0.85 }}>
                        <CardIcon index={i} />
                      </div>
                      <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-ui)', color: titleColor }}>
                        {t(div.titleKey)}
                      </h3>
                      {div.featured && (
                        <span className="relative shrink-0 w-1.5 h-1.5">
                          <span className="absolute inset-0 rounded-full bg-[#AEE37B] animate-ping opacity-70" />
                          <span className="relative block w-1.5 h-1.5 rounded-full bg-[#AEE37B]" />
                        </span>
                      )}
                    </div>
                    <p className="text-base font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                      {t(div.subtitleKey)}
                    </p>
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: tagColor, fontFamily: 'var(--font-body)' }}>
                      {t(div.taglineKey)}
                    </p>
                  </div>
                  {!div.featured && (
                    <span className="text-sm font-medium text-[var(--accent-fg)] mt-6 group-hover:translate-x-1 transition-transform duration-200 inline-block" style={{ fontFamily: 'var(--font-ui)' }}>
                      {t('common.learnMore')} →
                    </span>
                  )}
                  {div.featured && (
                    <span className="text-xs font-medium tracking-widest uppercase text-[#AEE37B]/70 mt-6" style={{ fontFamily: 'var(--font-ui)' }}>
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

          {/* Explore Each Platform link */}
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
              {t('home.builtForCompanies.exploreLink')} →
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
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white mb-6"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {t('home.precision.heading1')}<br />
                {t('home.precision.heading2Prefix')}
                <span style={{ color: 'var(--accent)' }}>{t('home.precision.heading2Accent')}</span>
              </h2>
              <p
                className="text-base text-white/55 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {t('home.precision.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Designed for Complex Environments ───────────────────────────────── */}
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
