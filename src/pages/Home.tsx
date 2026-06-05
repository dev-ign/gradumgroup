import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from '../i18n/useTranslation';

/* ─── Data ─────────────────────────────────────────────────────────── */

const DIVISIONS = [
  {
    code: '01',
    name: 'Gradum Consulting',
    subtitle: 'Advanced Technology & Engineering Advisory',
    tagline:
      'Advisory and technical support for teams building complex, performance-critical systems.',
    chips: ['Systems Architecture', 'Engineering Strategy', 'Technical Direction'],
    featured: false,
  },
  {
    code: '02',
    name: 'Gradum Construction',
    subtitle: 'Engineering, Architecture & Build',
    tagline:
      'End-to-end delivery across architectural design, engineering, and physical execution.',
    chips: ['Architecture', 'Civil & MEP', 'Build Delivery'],
    featured: false,
  },
  {
    code: '03',
    name: 'Gradum Services',
    subtitle: 'Business Operations & Growth Services',
    tagline:
      'Financial operations, accounting, and brand execution services designed to support scalable growth.',
    chips: ['Finance Ops', 'Accounting', 'Brand & Media'],
    featured: false,
  },
  {
    code: '04',
    name: 'Gradum Accelerator',
    subtitle: 'Startup Development & Venture Growth',
    tagline:
      'We partner with early-stage companies to build and scale technology-driven ventures.',
    chips: ['Venture Build', 'Scale Advisory', 'Capital Access'],
    featured: true,
  },
];

const CAPABILITIES = [
  { code: 'A.01', label: 'AI & Machine Learning' },
  { code: 'A.02', label: 'IoT & Smart Systems' },
  { code: 'A.03', label: 'Robotics & Automation' },
  { code: 'A.04', label: 'Data Analytics & Visualization' },
  { code: 'M.01', label: 'Systems Engineering' },
  { code: 'M.02', label: 'Model-Based Design' },
  { code: 'M.03', label: 'Lean Process Engineering' },
  { code: 'M.04', label: 'Agile & Iterative Delivery' },
  { code: 'I.01', label: 'Energy & Infrastructure' },
  { code: 'I.02', label: 'Healthcare Technology' },
  { code: 'I.03', label: 'Defense & Aerospace' },
  { code: 'I.04', label: 'Manufacturing & Supply Chain' },
];

const STEPS = [
  { num: '01', title: 'Assessment', desc: 'Clarifying objectives and operational constraints across stakeholders.' },
  { num: '02', title: 'Scope Alignment', desc: 'Defining deliverables, milestones, and lines of accountability.' },
  { num: '03', title: 'Structured Execution', desc: 'Delivering against measurable targets, on cadence.' },
  { num: '04', title: 'Ongoing Advisory', desc: 'Sustaining performance through disciplined oversight.' },
];

/* ─── Style constants ───────────────────────────────────────────────── */

const fDisplay = "'Space Grotesk', system-ui, sans-serif";
const fBody    = "'Inter', system-ui, sans-serif";
const fMono    = 'var(--font-mono)';

/* ─── Scroll reveal ────────────────────────────────────────────────── */

function ScrollReveal({
  children,
  style,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 8%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [18, 0, 0, -10]);

  return (
    <motion.div
      ref={ref}
      style={{ ...style, opacity, y }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const glassPanel: React.CSSProperties = {
  background: 'rgba(13, 19, 51, 0.55)',
  backdropFilter: 'blur(20px) saturate(140%)',
  WebkitBackdropFilter: 'blur(20px) saturate(140%)',
  borderRadius: 14,
  boxShadow: 'inset 0 0 0 1px rgba(199, 211, 234, 0.10), 0 24px 60px -20px rgba(0,0,0,0.55)',
};

/* ─── Shared atoms ──────────────────────────────────────────────────── */

function GradumMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="16" height="16" rx="3"
        transform="rotate(45 11 11)" stroke="currentColor" strokeWidth="1.4" />
      <rect x="7.5" y="7.5" width="7" height="7" rx="1.5"
        transform="rotate(45 11 11)" fill="currentColor" />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <ScrollReveal
      style={{ maxWidth: 720, marginInline: 'auto', textAlign: 'center' }}
    >
      <span className="gd-eyebrow">{eyebrow}</span>
      <h2 style={{
        fontFamily: fDisplay, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1,
        color: 'var(--gd-fg)', marginTop: 14, fontSize: 'clamp(32px, 4.4vw, 56px)',
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontFamily: fBody, color: 'var(--gd-fg-3)', lineHeight: 1.55,
          marginTop: 18, fontSize: 18, maxWidth: 620, marginInline: 'auto',
        }}>{subtitle}</p>
      )}
    </ScrollReveal>
  );
}

/* ─── Collage sub-cards ─────────────────────────────────────────────── */

function ConstructionDashboard() {
  const bars = [40, 62, 78, 55, 88, 70, 92];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <span key={c} style={{ width: 9, height: 9, borderRadius: 999, background: c, opacity: 0.55 }} />
        ))}
        <div style={{ flex: 1, marginLeft: 8, fontFamily: fMono, fontSize: 10, color: 'var(--gd-fg-4)' }}>
          gradum / projects / GR-204
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: fMono, fontSize: 10, color: 'var(--gd-fg-4)', letterSpacing: '0.06em' }}>Tower B · Site Progress</div>
          <div style={{ fontFamily: fDisplay, fontSize: 26, color: 'var(--gd-fg)', marginTop: 6, fontWeight: 500 }}>
            72<span style={{ color: 'var(--gd-fg-3)', fontSize: 18 }}>%</span>
          </div>
        </div>
        <span style={{
          padding: '4px 10px', borderRadius: 999, fontSize: 10,
          color: 'var(--gd-fg-2)', fontFamily: fBody,
          background: 'rgba(174,227,123,0.10)',
          boxShadow: 'inset 0 0 0 1px rgba(174,227,123,0.25)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--gd-accent)', boxShadow: '0 0 8px var(--gd-accent-glow)' }} />
          On schedule
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[['$4.2M', 'Budget'], ['18d', 'To MS-04'], ['142', 'Crew']].map(([v, k]) => (
          <div key={k} style={{ padding: '10px 12px', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(199,211,234,0.08)' }}>
            <div style={{ fontFamily: fDisplay, fontSize: 16, color: 'var(--gd-fg)', fontWeight: 500 }}>{v}</div>
            <div style={{ fontFamily: fMono, fontSize: 9, color: 'var(--gd-fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{k}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: fBody, fontSize: 10, color: 'var(--gd-fg-3)' }}>Weekly Output</span>
          <span style={{ fontFamily: fMono, fontSize: 9, color: 'var(--gd-fg-4)' }}>m³ · 7d</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 64 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 4 ? 'var(--gd-accent)' : 'rgba(199,211,234,0.16)',
              borderRadius: 3,
              boxShadow: i === 4 ? '0 0 12px var(--gd-accent-glow)' : 'none',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandStyleCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontFamily: fMono, fontSize: 10, color: 'var(--gd-fg-4)', letterSpacing: '0.06em' }}>Brand · Style</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
        {['#0D1333', '#1B4FD8', '#0A2924', '#80ADAC', '#B3E4C6', '#AEE37B'].map((c) => (
          <div key={c} style={{ aspectRatio: '1/1', borderRadius: 6, background: c, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
        ))}
      </div>
      <div style={{ padding: '12px 14px', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(199,211,234,0.08)' }}>
        <div style={{ fontFamily: fDisplay, fontSize: 28, color: 'var(--gd-fg)', fontWeight: 500, lineHeight: 1 }}>Aa</div>
        <div style={{ fontFamily: fMono, fontSize: 9, color: 'var(--gd-fg-4)', marginTop: 6 }}>Space Grotesk</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            aspectRatio: '1/1', borderRadius: 6,
            background: i === 1 ? 'rgba(174,227,123,0.10)' : 'transparent',
            boxShadow: i === 1 ? 'inset 0 0 0 1px rgba(174,227,123,0.45)' : 'inset 0 0 0 1px rgba(199,211,234,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: i === 1 ? 'var(--gd-accent)' : 'var(--gd-fg-3)',
          }}>
            <GradumMark size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: 'rgba(174,227,123,0.12)',
          boxShadow: 'inset 0 0 0 1px rgba(174,227,123,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gd-accent)',
        }}>
          <GradumMark size={12} />
        </div>
        <div style={{ fontFamily: fBody, fontSize: 11, color: 'var(--gd-fg-2)', fontWeight: 500 }}>Sign in to Gradum</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          height: 30, borderRadius: 6,
          boxShadow: 'inset 0 0 0 1px rgba(199,211,234,0.10)',
          display: 'flex', alignItems: 'center', padding: '0 10px',
          fontFamily: fBody, fontSize: 10, color: 'var(--gd-fg-4)',
        }}>you@company.com</div>
        <div style={{
          height: 30, borderRadius: 6,
          background: 'var(--gd-accent)', color: 'var(--gd-accent-fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: fBody, fontSize: 11, fontWeight: 600,
          boxShadow: '0 0 18px var(--gd-accent-glow)',
        }}>Continue</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ flex: 1, height: 1, background: 'rgba(199,211,234,0.10)' }} />
        <span style={{ fontFamily: fMono, fontSize: 9, color: 'var(--gd-fg-4)' }}>OR</span>
        <span style={{ flex: 1, height: 1, background: 'rgba(199,211,234,0.10)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['Continue with SSO', 'Continue with SAML'].map((p) => (
          <div key={p} style={{
            height: 28, borderRadius: 999,
            boxShadow: 'inset 0 0 0 1px rgba(199,211,234,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: fBody, fontSize: 10, color: 'var(--gd-fg-2)',
          }}>{p}</div>
        ))}
      </div>
    </div>
  );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span style={{ fontFamily: fMono, color: 'var(--gd-fg-4)', width: 12, textAlign: 'right' }}>{n}</span>
      <span>{children}</span>
    </div>
  );
}

function CodeSnippet() {
  return (
    <div style={{ fontFamily: fMono, fontSize: 10.5, lineHeight: 1.7, color: 'var(--gd-fg-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--gd-accent)', boxShadow: '0 0 8px var(--gd-accent-glow)' }} />
        <span style={{ fontSize: 10, color: 'var(--gd-fg-4)' }}>auth.ts</span>
      </div>
      <CodeLine n={1}><span style={{ color: 'var(--gd-accent)' }}>const</span>{' '}<span style={{ color: 'var(--gd-fg-2)' }}>session</span>{' = '}<span style={{ color: '#80ADAC' }}>await</span></CodeLine>
      <CodeLine n={2}>{'  '}gradum.<span style={{ color: '#B3E4C6' }}>verify</span>{'({'}</CodeLine>
      <CodeLine n={3}>{'    '}scope: <span style={{ color: 'var(--gd-accent)' }}>'admin'</span>,</CodeLine>
      <CodeLine n={4}>{'    '}mfa: <span style={{ color: 'var(--gd-accent)' }}>true</span>,</CodeLine>
      <CodeLine n={5}>{'  '}{'}'});</CodeLine>
      <div style={{ marginTop: 10, fontSize: 9, color: 'var(--gd-fg-4)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--gd-accent)' }}>✓</span> verified · 12ms
      </div>
    </div>
  );
}

function TokensChip() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontFamily: fMono, fontSize: 10, color: 'var(--gd-fg-4)', letterSpacing: '0.06em' }}>Tokens</div>
      {[['Primary', 'var(--gd-accent)'], ['Surface', '#1B4FD8'], ['Accent', '#80ADAC']].map(([n, c]) => (
        <div key={n} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '6px 8px', borderRadius: 6,
          boxShadow: 'inset 0 0 0 1px rgba(199,211,234,0.08)',
        }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: c, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
          <span style={{ fontFamily: fBody, fontSize: 10, color: 'var(--gd-fg-2)', flex: 1 }}>{n}</span>
          <span style={{ fontFamily: fMono, fontSize: 9, color: 'var(--gd-fg-4)' }}>—</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Sections ──────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section style={{ position: 'relative', padding: '100px 0 32px', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(174,227,123,0.10) 0%, transparent 60%)',
      }} />
      <div className="gd-grid-bg" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6,
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, black 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px', position: 'relative', textAlign: 'center' }}>
        <ScrollReveal>
          <h1
            className="gd-sweep-text"
            style={{
              fontFamily: fDisplay, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.08,
              color: 'var(--gd-fg)', fontSize: 'clamp(28px, 4vw, 60px)',
              maxWidth: 880, margin: '0 auto',
            }}
          >
            Structured Advisory.<br />
            Engineered Execution{' '}
            <span style={{ fontStyle: 'normal', fontWeight: 700 }}>
              Platform
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal
          style={{
            fontFamily: fBody, marginTop: 28, fontSize: 18,
            maxWidth: 620, marginInline: 'auto', color: 'var(--gd-fg-3)', lineHeight: 1.55,
          }}
        >
          <p style={{ margin: 0 }}>
            Gradum helps organizations design, build, and scale solutions across business operations,
            technology, and infrastructure — engineered for performance-critical environments.
          </p>
        </ScrollReveal>

        <ScrollReveal
          style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#contact" className="gd-btn gd-btn-primary">Request Consultation →</a>
          <a href="#platform" className="gd-btn gd-btn-ghost">Explore Platform</a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DashboardCollage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.82, 1], [0, 1, 1, 0]);

  return (
    <motion.section ref={ref} style={{ position: 'relative', marginTop: -20 }}>
      <motion.div style={{
        y, opacity,
        maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))',
        marginInline: 'auto', padding: '0 32px', position: 'relative',
      }}>
        <div style={{
          position: 'relative', height: 400, marginTop: 31,
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 92%)',
        }}>
          {/* Center: Construction dashboard */}
          <div className="gd-collage-card" style={{
            position: 'absolute', left: '50%', top: 30,
            ['--tx' as string]: '-50%', ['--rot' as string]: '0deg',
            ['--fan-x' as string]: '0px', ['--fan-y' as string]: '0px',
            ['--fan-start-rot' as string]: '0deg',
            animationDelay: '120ms', width: 'min(560px, 56%)', zIndex: 3,
            ...glassPanel, padding: 20,
          }}>
            <ConstructionDashboard />
          </div>

          {/* Left-back: Brand / style */}
          <div className="gd-collage-card" style={{
            position: 'absolute', left: '6%', top: 80,
            ['--rot' as string]: '-1.2deg', ['--fan-x' as string]: '180px',
            ['--fan-y' as string]: '-20px', ['--fan-start-rot' as string]: '14deg',
            animationDelay: '380ms', width: 'min(300px, 30%)', zIndex: 2,
            ...glassPanel, padding: 16,
          }}>
            <BrandStyleCard />
          </div>

          {/* Right-back: Auth panel */}
          <div className="gd-collage-card" style={{
            position: 'absolute', right: '6%', top: 60,
            ['--rot' as string]: '1.4deg', ['--fan-x' as string]: '-180px',
            ['--fan-y' as string]: '-20px', ['--fan-start-rot' as string]: '-14deg',
            animationDelay: '380ms', width: 'min(260px, 26%)', zIndex: 2,
            ...glassPanel, padding: 16,
          }}>
            <AuthPanel />
          </div>

          {/* Foreground-left: Code snippet */}
          <div className="gd-collage-card" style={{
            position: 'absolute', left: '14%', top: 230,
            ['--rot' as string]: '-0.6deg', ['--fan-x' as string]: '120px',
            ['--fan-y' as string]: '-40px', ['--fan-start-rot' as string]: '8deg',
            animationDelay: '560ms', width: 'min(280px, 28%)', zIndex: 4,
            ...glassPanel, padding: 14,
          }}>
            <CodeSnippet />
          </div>

          {/* Foreground-right: Tokens */}
          <div className="gd-collage-card" style={{
            position: 'absolute', right: '12%', top: 250,
            ['--rot' as string]: '1deg', ['--fan-x' as string]: '-120px',
            ['--fan-y' as string]: '-40px', ['--fan-start-rot' as string]: '-8deg',
            animationDelay: '560ms', width: 'min(220px, 22%)', zIndex: 4,
            ...glassPanel, padding: 14,
          }}>
            <TokensChip />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function DivisionGlyph({ index }: { index: number }) {
  return (
    <span style={{ color: 'var(--gd-fg)', display: 'inline-flex' }}>
      <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
        {index === 0 && <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="12" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="12" width="7" height="7" rx="1" />
          <rect x="12" y="12" width="7" height="7" rx="1" fill="currentColor" stroke="none" />
        </>}
        {index === 1 && <>
          <path d="M3 18 L11 5 L19 18 Z" />
          <line x1="3" y1="18" x2="19" y2="18" />
        </>}
        {index === 2 && <>
          <circle cx="11" cy="11" r="8" />
          <circle cx="11" cy="11" r="3" fill="currentColor" stroke="none" />
        </>}
        {index === 3 && <>
          <path d="M11 3 L19 11 L11 19 L3 11 Z" />
          <path d="M11 7 L15 11 L11 15 L7 11 Z" fill="currentColor" stroke="none" />
        </>}
      </svg>
    </span>
  );
}

function Platform() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="platform" className="gd-section">
      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px' }}>
        <SectionHeader
          eyebrow="// 01 — Platform"
          title="One platform. Four capabilities."
          subtitle="Platform divisions operate under defined mandate frameworks and integrate within a unified advisory and execution architecture."
        />
        <div
          style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}
        >
          {DIVISIONS.map((d, i) => (
            <ScrollReveal key={d.code}>
              <motion.div
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="gd-glass"
                style={{
                  position: 'relative', padding: 32,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  minHeight: 280,
                  background: d.featured
                    ? 'linear-gradient(135deg, rgba(174,227,123,0.07), rgba(186,214,247,0.025))'
                    : undefined,
                  transform: hovered === i ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform .35s ease',
                  overflow: 'hidden',
                }}
              >
                <span aria-hidden="true" style={{
                  position: 'absolute', right: 24, top: 18,
                  fontFamily: fMono, fontSize: 12, color: 'var(--gd-fg-4)', letterSpacing: '0.08em',
                }}>{d.code}</span>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <DivisionGlyph index={i} />
                    {d.featured && (
                      <span className="gd-chip" style={{ padding: '4px 10px', fontSize: 11 }}>
                        <span className="gd-live-dot" />
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: fDisplay, fontWeight: 500, fontSize: 26, letterSpacing: '-0.015em', lineHeight: 1.1, color: 'var(--gd-fg)' }}>
                    {d.name}
                  </h3>
                  <div className="gd-eyebrow" style={{ marginTop: 6 }}>{d.subtitle}</div>
                  <p style={{ fontFamily: fBody, color: 'var(--gd-fg-3)', lineHeight: 1.55, marginTop: 16, fontSize: 15, maxWidth: 480 }}>
                    {d.tagline}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
                  {d.chips.map((c) => (
                    <span key={c} className="gd-chip" style={{ padding: '4px 10px', fontSize: 11 }}>{c}</span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const groups = [
    { code: 'A', label: 'Applications', items: CAPABILITIES.filter((c) => c.code.startsWith('A')) },
    { code: 'M', label: 'Methodologies', items: CAPABILITIES.filter((c) => c.code.startsWith('M')) },
    { code: 'I', label: 'Industries', items: CAPABILITIES.filter((c) => c.code.startsWith('I')) },
  ];
  return (
    <section className="gd-section">
      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px' }}>
        <SectionHeader
          eyebrow="// 02 — Capabilities"
          title="Built for teams operating at scale."
          subtitle="We operate across advanced engineering domains, proven technical frameworks, and complex industry environments."
        />
        <div
          style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
        >
          {groups.map((g) => (
            <ScrollReveal key={g.code} className="gd-glass" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fDisplay, fontSize: 22, color: 'var(--gd-fg)', fontWeight: 500 }}>{g.label}</span>
                <span className="gd-eyebrow">{g.code}.0×</span>
              </div>
              <hr className="gd-rule" style={{ marginBlock: 18, border: 0 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {g.items.map((it) => (
                  <li key={it.code} style={{
                    display: 'grid', gridTemplateColumns: '52px 1fr auto', alignItems: 'center', gap: 12,
                    padding: '10px 0', borderBottom: '1px dashed var(--gd-hairline)',
                  }}>
                    <span style={{ fontFamily: fMono, fontSize: 11, color: 'var(--gd-fg-4)' }}>{it.code}</span>
                    <span style={{ fontFamily: fBody, fontSize: 14, color: 'var(--gd-fg-2)' }}>{it.label}</span>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--gd-accent)', boxShadow: '0 0 8px var(--gd-accent-glow)' }} />
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintGraphic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="bp-arc-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="bp-node-glow">
          <stop offset="0%" stopColor="#AEE37B" stopOpacity="1" />
          <stop offset="100%" stopColor="#AEE37B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[80, 140, 210, 290, 380].map((r) => (
        <circle key={r} cx="500" cy="300" r={r} fill="none" stroke="url(#bp-arc-fade)" strokeWidth="1" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line key={i}
            x1={500 + Math.cos(a) * 60} y1={300 + Math.sin(a) * 60}
            x2={500 + Math.cos(a) * 380} y2={300 + Math.sin(a) * 380}
            stroke="rgba(216,220,236,0.06)" strokeWidth="1" />
        );
      })}
      {[[500, 300], [420, 220], [580, 360], [460, 400], [560, 180]].map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="14" fill="url(#bp-node-glow)" />
          <circle cx={p[0]} cy={p[1]} r="3" fill="#AEE37B" />
        </g>
      ))}
      <circle cx="500" cy="300" r="20" fill="none" stroke="rgba(216,220,236,0.3)" strokeWidth="1" />
      <line x1="470" y1="300" x2="530" y2="300" stroke="rgba(216,220,236,0.3)" strokeWidth="1" />
      <line x1="500" y1="270" x2="500" y2="330" stroke="rgba(216,220,236,0.3)" strokeWidth="1" />
    </svg>
  );
}

function Precision() {
  return (
    <section className="gd-section" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px' }}>
        <ScrollReveal
          className="gd-glass-solid"
          style={{
            position: 'relative',
            padding: 'clamp(40px, 5vw, 72px)',
            overflow: 'hidden',
            background: `
              radial-gradient(ellipse 50% 60% at 90% 50%, rgba(174,227,123,0.08), transparent 70%),
              linear-gradient(135deg, #0F1738 0%, #0B102B 100%)
            `,
          }}
        >
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '46%',
            opacity: 0.55, pointerEvents: 'none',
          }}>
            <BlueprintGraphic />
          </div>

          <div style={{ position: 'relative', maxWidth: 560 }}>
            <span className="gd-eyebrow">// 03 — Precision</span>
            <h2 style={{
              fontFamily: fDisplay, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.04,
              color: 'var(--gd-fg)', marginTop: 14, fontSize: 'clamp(32px, 4.6vw, 60px)',
            }}>
              Gradum is not built for volume.<br />
              It is{' '}
              <span style={{ color: 'var(--gd-accent)', fontStyle: 'italic', fontWeight: 400 }}>
                engineered for precision.
              </span>
            </h2>
            <p style={{ fontFamily: fBody, color: 'var(--gd-fg-3)', lineHeight: 1.55, marginTop: 24, fontSize: 17, maxWidth: 480 }}>
              We work selectively with organizations where execution quality, depth, and long-term
              impact matter. From design to delivery, we focus on what actually moves the needle.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 520 }}>
              {['System Architecture', 'Embedded Systems', 'Control & Automation', 'Engineering Strategy'].map((t) => (
                <span key={t} className="gd-chip">{t}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="gd-section">
      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px' }}>
        <SectionHeader
          eyebrow="// 04 — Methodology"
          title="A disciplined operating model."
          subtitle="Every engagement runs through the same four-stage cadence — clear objectives, defined scope, measured execution, and ongoing oversight."
        />
        <div
          style={{
            marginTop: 64,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
            background: 'var(--gd-hairline)',
            borderRadius: 16, overflow: 'hidden',
            boxShadow: 'var(--gd-shadow-pill)',
          }}
        >
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.num} style={{
              background: 'var(--gd-bg)', padding: 28, minHeight: 220,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fMono, fontSize: 12, color: 'var(--gd-accent)', letterSpacing: '0.08em' }}>
                  STAGE {s.num}
                </span>
                <span style={{
                  width: 22, height: 22, borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 0 0 1px var(--gd-hairline-b)',
                  fontFamily: fMono, fontSize: 11, color: 'var(--gd-fg-3)',
                }}>{i + 1}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: fDisplay, fontSize: 22, fontWeight: 500, color: 'var(--gd-fg)', marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: fBody, fontSize: 14, color: 'var(--gd-fg-3)', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        height: 42, width: '100%', padding: '0 14px',
        background: 'rgba(199, 211, 234, 0.06)',
        borderRadius: 4, border: 'none',
        boxShadow: focused ? 'inset 0 0 0 1px rgba(174,227,123,0.5)' : 'inset 0 0 0 1px var(--gd-hairline)',
        color: 'var(--gd-fg)', fontFamily: fBody, fontSize: 14, letterSpacing: '-0.01em',
        outline: 'none', transition: 'box-shadow .2s ease',
      }}
    />
  );
}

function FormSelect({ children }: { children: React.ReactNode }) {
  return (
    <select style={{
      height: 42, width: '100%', padding: '0 14px',
      background: 'rgba(199, 211, 234, 0.06)',
      borderRadius: 4, border: 'none',
      boxShadow: 'inset 0 0 0 1px var(--gd-hairline)',
      color: 'var(--gd-fg)', fontFamily: fBody, fontSize: 14, letterSpacing: '-0.01em',
      outline: 'none', appearance: 'none',
      backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--gd-fg-3) 50%), linear-gradient(135deg, var(--gd-fg-3) 50%, transparent 50%)',
      backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 13px) 50%',
      backgroundSize: '5px 5px', backgroundRepeat: 'no-repeat',
    }}>{children}</select>
  );
}

function ContactCTA({ onOpenModal }: { onOpenModal: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="gd-section">
      <div style={{ maxWidth: 1280, minWidth: 'min(1100px, calc(100vw - 48px))', marginInline: 'auto', padding: '0 32px' }}>
        <ScrollReveal
          className="gd-glass-solid"
          style={{
            padding: 'clamp(40px, 5vw, 80px)',
            display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center',
            background: `
              radial-gradient(ellipse 60% 60% at 0% 100%, rgba(27,79,216,0.18), transparent 70%),
              radial-gradient(ellipse 50% 50% at 100% 0%, rgba(174,227,123,0.10), transparent 70%),
              #0B102B
            `,
          }}
        >
          <div>
            <span className="gd-eyebrow">// Begin engagement</span>
            <h2 style={{
              fontFamily: fDisplay, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.1,
              color: 'var(--gd-fg)', marginTop: 14, fontSize: 'clamp(32px, 4.2vw, 52px)',
            }}>
              Designed for complex environments.
            </h2>
            <p style={{ fontFamily: fBody, color: 'var(--gd-fg-3)', lineHeight: 1.55, marginTop: 18, fontSize: 17, maxWidth: 460 }}>
              All engagements are managed through the Gradum Client Portal — secure collaboration,
              defined project stages, and centralized documentation.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Technology & Engineering', 'Business Operations', 'Infrastructure & Build', 'Data & Intelligence'].map((t) => (
                <span key={t} className="gd-chip">{t}</span>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="gd-glass" style={{ padding: 28 }}>
            {submitted ? (
              <div style={{ textAlign: 'center', paddingBlock: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 999,
                  background: 'var(--gd-accent)', color: 'var(--gd-accent-fg)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>✓</div>
                <h3 style={{ fontFamily: fDisplay, fontSize: 20, color: 'var(--gd-fg)', marginTop: 16 }}>
                  Message received
                </h3>
                <p style={{ fontFamily: fBody, color: 'var(--gd-fg-3)', fontSize: 14, marginTop: 8 }}>
                  A member of our team will contact you shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: fDisplay, fontSize: 20, color: 'var(--gd-fg)', marginBottom: 6 }}>
                  Request a consultation
                </h3>
                <p style={{ fontFamily: fBody, color: 'var(--gd-fg-3)', fontSize: 13, marginBottom: 20 }}>
                  We respond within one business day.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <FormInput placeholder="Full name" />
                  <FormInput placeholder="you@company.com" type="email" />
                  <FormSelect>
                    <option>Consulting Inquiry</option>
                    <option>Construction Project</option>
                    <option>Accounting &amp; Finance</option>
                    <option>Marketing &amp; Media</option>
                    <option>Accelerator Program</option>
                  </FormSelect>
                  <button type="submit" className="gd-btn gd-btn-primary"
                    style={{ height: 46, marginTop: 4, width: '100%', borderRadius: 6, fontSize: 14 }}>
                    Submit inquiry
                  </button>
                </div>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <button type="button" onClick={onOpenModal}
                    style={{ fontFamily: fBody, fontSize: 12, color: 'var(--gd-fg-4)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Or use the full contact form →
                  </button>
                </div>
              </>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PageFooter() {
  const { openModal } = useModal();
  const { t } = useTranslation();

  return (
    <footer style={{ borderTop: '1px solid var(--gd-footer-line)', background: 'var(--gd-footer-bg)' }}>
      <div style={{ maxWidth: 1280, marginInline: 'auto', padding: '48px 32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 40,
          flexWrap: 'wrap',
          marginBottom: 48,
        }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontFamily: fDisplay,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '0.02em',
              color: 'var(--gd-footer-fg)',
              lineHeight: 1,
            }}>
              GRADUM
            </span>
            <span style={{
              fontFamily: fMono,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.3em',
              color: 'var(--gd-footer-fg-3)',
              textTransform: 'uppercase',
            }}>
              GROUP
            </span>
          </a>

          <button
            type="button"
            onClick={openModal}
            style={{
              border: '1px solid rgba(174,227,123,0.35)',
              borderRadius: 999,
              background: 'var(--gd-accent)',
              color: 'var(--gd-accent-fg)',
              fontFamily: fBody,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '10px 18px',
              boxShadow: '0 0 24px var(--gd-accent-glow)',
            }}
          >
            {t('common.requestConsultation')}
          </button>
        </div>

        <div style={{
          borderTop: '1px solid var(--gd-footer-line)',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <button
            type="button"
            onClick={openModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gd-footer-fg-3)',
              fontFamily: fBody,
              fontSize: 12,
              transition: 'color .2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gd-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--gd-footer-fg-3)'; }}
          >
            {t('common.requestConsultation')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://www.instagram.com/gradumgroup/"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group Instagram"
              style={{ display: 'inline-flex', transition: 'opacity .2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 6 }}>
                <defs>
                  <linearGradient id="home-ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F58529" />
                    <stop offset="50%" stopColor="#DD2A7B" />
                    <stop offset="100%" stopColor="#8134AF" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#home-ig-gradient)" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4" stroke="url(#home-ig-gradient)" strokeWidth="2" fill="none" />
                <circle cx="18" cy="6" r="1.25" fill="url(#home-ig-gradient)" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/gradumgroup"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group LinkedIn"
              style={{ display: 'inline-flex', transition: 'opacity .2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/gradumgroup"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group Facebook"
              style={{ display: 'inline-flex', transition: 'opacity .2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.972H15.83c-1.491 0-1.956.931-1.956 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <p style={{ fontFamily: fBody, fontSize: 11, color: 'var(--gd-footer-fg-4)' }}>
            {t('common.footerLegal')}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page export ───────────────────────────────────────────────────── */

export function Home() {
  const { openModal } = useModal();
  const { theme } = useTheme();

  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevAttach = document.body.style.backgroundAttachment;
    document.body.style.background = theme === 'dark'
      ? 'radial-gradient(ellipse 70% 55% at 50% 18%, #1A2358 0%, #121944 35%, #0A0F2C 65%, #05071C 100%)'
      : 'radial-gradient(ellipse 70% 55% at 50% 18%, #FFFFFF 0%, #F5F7FF 40%, #EDF0FA 70%, #E8ECF8 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.documentElement.style.setProperty(
      '--nav-bg',
      theme === 'dark' ? 'rgba(13, 19, 51, 0.88)' : 'rgba(242, 245, 255, 0.88)'
    );
    return () => {
      document.body.style.background = prevBg;
      document.body.style.backgroundAttachment = prevAttach;
      document.documentElement.style.removeProperty('--nav-bg');
    };
  }, [theme]);

  return (
    <PageTransition>
      <div style={{ color: 'var(--gd-fg-2)', fontFamily: fBody }}>
        <Hero />
        <DashboardCollage />
        <Platform />
        <Capabilities />
        <Precision />
        <Methodology />
        <ContactCTA onOpenModal={openModal} />
        <PageFooter />
      </div>
    </PageTransition>
  );
}
