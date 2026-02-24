import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';

const DIVISIONS = [
  {
    name: 'Gradum Consulting',
    desc: 'Engineering & Technology advisory focused on system architecture, digital infrastructure, and performance-critical operations. We provide executive-level engineering strategy and disciplined technical oversight across complex technical ecosystems.',
  },
  {
    name: 'Gradum Construction',
    desc: 'Project-based architectural and structural execution in the Dominican Republic.',
  },
  {
    name: 'Gradum Services',
    desc: 'Financial governance and brand execution infrastructure supporting operational performance.',
  },
  {
    name: 'Gradum Accelerator',
    desc: 'A selective initiative launching in a future phase as part of Gradum\'s disciplined regional expansion.',
  },
];

const PRINCIPLES = [
  'Discipline over noise.',
  'Structure over improvisation.',
  'Execution over abstraction.',
  'Precision over volume.',
];

const ENGAGEMENT_PRINCIPLES = [
  'Clear scope before action',
  'Established ownership and accountability',
  'Transparent coordination',
  'Measurable operational impact',
];

export function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">About</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-[var(--text-primary)] mb-8">
              Engineered for<br /><span className="text-[#AEE37B]">Precision.</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Gradum is an engineering-led advisory and execution platform structured across focused verticals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed"
            >
              <p>
                We partner with organizations seeking operational clarity, technical rigor, and measurable performance across complex environments.
              </p>
              <p>
                Engagements typically involve cross-functional coordination, regulated operating environments, and executive-level accountability structures.
              </p>
              <p>
                Initial operations are anchored in the Dominican Republic, with expansion across Latin America and North America.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Our Platform</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">
              Focused Verticals
            </h2>
          </motion.div>

          <div className="space-y-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {DIVISIONS.map((div, i) => (
              <motion.div
                key={div.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row gap-6 p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="sm:w-1/3">
                  <h3 className="text-base font-black tracking-tight text-[var(--text-primary)]">{div.name}</h3>
                </div>
                <div className="sm:w-2/3">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{div.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Philosophy */}
      <section className="py-24" style={{ backgroundColor: '#0A2924' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Philosophy</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
                Execution Philosophy
              </h2>
              <ul className="space-y-4">
                {PRINCIPLES.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE37B] flex-shrink-0" />
                    <span className="text-base font-semibold text-white">{p}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="text-sm text-[#94b5b0] leading-relaxed mt-8">
                Sustainable performance is built through defined scope, accountable ownership, and controlled delivery — not reactive decision-making.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Principles</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
                Engagement Principles
              </h2>
              <p className="text-sm text-[#94b5b0] leading-relaxed mb-8">Every engagement prioritizes:</p>
              <ul className="space-y-4">
                {ENGAGEMENT_PRINCIPLES.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[#AEE37B] font-bold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-white font-medium">{p}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-[#1b6259]">
                <p className="text-base font-bold text-white leading-tight">
                  Gradum is not built for volume.<br />
                  <span className="text-[#AEE37B]">It is engineered for precision.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
