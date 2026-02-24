import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';

const PRACTICE_AREAS = [
  {
    name: 'Accounting & Finance',
    tagline: 'Financial structure and operational clarity.',
    desc: 'We provide structured financial coordination, compliance oversight, and planning support to strengthen internal controls and executive decision-making.',
    to: '/services/accounting-finance',
    cta: 'Explore Accounting & Finance',
  },
  {
    name: 'Marketing & Media',
    tagline: 'Brand discipline and structured execution.',
    desc: 'We support positioning, digital management, and campaign coordination — ensuring communication systems align with business strategy and operational priorities.',
    to: '/services/marketing-media',
    cta: 'Explore Marketing & Media',
  },
];

const ENGAGEMENT_STEPS = [
  { num: '01', title: 'Assessment', desc: 'Clarifying priorities and performance objectives.' },
  { num: '02', title: 'Scope Alignment', desc: 'Defining deliverables, timelines, and ownership.' },
  { num: '03', title: 'Structured Execution', desc: 'Delivering against defined milestones.' },
  { num: '04', title: 'Ongoing Advisory', desc: 'Sustaining performance through disciplined oversight.' },
];

export function Services() {
  const { openModal } = useModal();

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative py-28 lg:py-40 overflow-hidden"
        style={{ backgroundColor: '#0A2924' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(174,227,123,1) 1px, transparent 1px), linear-gradient(90deg, rgba(174,227,123,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#AEE37B' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Gradum Services</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Operational Advisory<br />
              <span className="text-[#AEE37B]">for Disciplined Execution.</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              Gradum Services provides operational infrastructure support within defined financial and brand governance mandates.
            </p>
            <Button onClick={openModal} size="lg">Strengthen Your Operations</Button>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Overview</p>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  We partner with organizations requiring structured financial governance and controlled brand infrastructure.
                </p>
                <p>
                  Engagements operate under mandate-based workflows, compliance standards, and measurable reporting structures aligned to business objectives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Practice Areas</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">Service Divisions</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {PRACTICE_AREAS.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-10 flex flex-col group relative"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#AEE37B] group-hover:w-full transition-all duration-500" />
                <span className="block text-3xl font-black text-[#AEE37B] opacity-25 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-black tracking-tight text-[var(--text-primary)] mb-2">{area.name}</h3>
                <p className="text-sm font-semibold text-[#AEE37B] mb-4">{area.tagline}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">{area.desc}</p>
                <Link
                  to={area.to}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#AEE37B] hover:gap-4 transition-all duration-200"
                >
                  {area.cta} <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Methodology</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">Engagement Model</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {ENGAGEMENT_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <span className="block text-4xl font-black text-[#AEE37B] opacity-30 mb-4">{step.num}</span>
                <h3 className="text-sm font-black tracking-tight text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: '#0A2924' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">
              Strengthen Your Operations
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-10 max-w-md mx-auto">
              Mandate-based execution frameworks aligned to your business objectives.
            </p>
            <Button onClick={openModal} size="lg">Strengthen Your Operations</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
