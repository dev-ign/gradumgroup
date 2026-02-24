import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const DIVISIONS = [
  {
    name: 'Gradum Consulting',
    tagline: 'Engineering & Technology Advisory for performance-driven industries.',
    to: '/consulting',
    available: true,
  },
  {
    name: 'Gradum Construction',
    tagline: 'Architectural and structural execution.',
    to: '/construction',
    available: true,
  },
  {
    name: 'Gradum Services',
    tagline: 'Financial Governance & Brand Execution Infrastructure.',
    to: '/services',
    available: true,
  },
  {
    name: 'Gradum Accelerator',
    tagline: 'Venture development platform.',
    to: '/accelerator',
    available: false,
  },
];

const HOW_WE_WORK = [
  { num: '01', title: 'Assessment', desc: 'Clarifying objectives and operational constraints.' },
  { num: '02', title: 'Scope Alignment', desc: 'Defining deliverables, milestones, and accountability.' },
  { num: '03', title: 'Structured Execution', desc: 'Delivering against measurable targets.' },
  { num: '04', title: 'Ongoing Advisory', desc: 'Sustaining performance through disciplined oversight.' },
];

export function Home() {
  const { openModal } = useModal();

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.08] dark:opacity-[0.12]"
          style={{ backgroundColor: '#AEE37B' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6"
            >
              Engineering-Led Advisory Platform
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-[var(--text-primary)] mb-8"
            >
              Structured<br />Advisory.<br />
              <span className="text-[#AEE37B]">Engineered</span><br />Execution.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10"
            >
              Gradum is an engineering-led advisory and execution platform structured to address technical, operational, and infrastructure complexity across performance-critical environments. We partner with mid-market enterprises and regional leaders operating in engineering-intensive, regulated, and infrastructure-critical industries.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button onClick={openModal} size="lg">
                Request a Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Divisions */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Our Platform</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)] max-w-2xl leading-tight">
              Integrated advisory and execution architecture.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed">
              Platform divisions operate under defined mandate frameworks and integrate within a unified advisory and execution architecture designed for multi-functional and multi-entity environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {DIVISIONS.map((div, i) => (
              <motion.div
                key={div.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative p-10 flex flex-col justify-between min-h-[220px]"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                {/* hover accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: '#AEE37B', opacity: 0 }}
                />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#AEE37B] group-hover:w-full transition-all duration-500" />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {!div.available && (
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border border-[var(--border-color)] text-[var(--text-secondary)]">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-[var(--text-primary)] mb-2 group-hover:text-[#AEE37B] transition-colors duration-300">
                    {div.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{div.tagline}</p>
                </div>

                {div.available && (
                  <Link
                    to={div.to}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#AEE37B] hover:gap-4 transition-all duration-200"
                  >
                    Learn More
                    <span>→</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Methodology</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)]">
              How We Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {HOW_WE_WORK.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="block text-5xl font-black text-[#AEE37B] opacity-30 mb-4">{step.num}</span>
                <h3 className="text-base font-black tracking-tight text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Portal CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor: '#0A2924' }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: '#AEE37B' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Client Coordination</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              Structured Client Coordination
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-10 max-w-lg">
              All engagements are managed through the Gradum Client Portal, ensuring secure collaboration, defined project stages, and centralized documentation.
            </p>
            <Button onClick={openModal} variant="primary" size="lg">
              Request a Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
