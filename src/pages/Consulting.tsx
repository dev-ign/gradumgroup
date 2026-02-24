import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';

const ENGAGEMENT_MODEL = [
  {
    title: 'Technical Strategy & Advisory',
    desc: 'Executive-level guidance on system architecture, technology roadmaps, modernization programs, and performance engineering direction.',
  },
  {
    title: 'Performance Engineering & Execution Support',
    desc: 'Embedded technical execution across modeling, simulation, embedded systems, digital twin development, and industrial software integration.',
  },
];

const CAPABILITIES = [
  {
    title: 'Advanced Modeling & Simulation',
    desc: 'System-level modeling and multi-domain simulation supporting validation, optimization, and architecture-level design decisions.',
  },
  {
    title: 'Embedded Systems & Industrial Software Architecture',
    desc: 'Embedded software architecture, model-based development workflows, interface integration, and production-grade system design.',
  },
  {
    title: 'Digital Twin & Performance Engineering',
    desc: 'Digital infrastructure architecture, predictive performance modeling, and system-level optimization.',
  },
  {
    title: 'Industrial Software & Control System Integration',
    desc: 'Toolchain alignment across modeling platforms, simulation environments, control systems, and embedded software ecosystems.',
  },
];

const INDUSTRIES = ['Agriculture', 'Energy & Utilities', 'Industrial Automation', 'Medical Devices', 'Mining'];

export function Consulting() {
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
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#AEE37B' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Gradum Consulting</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Engineering &<br />Technology Advisory<br />
              <span className="text-[#AEE37B]">for Performance-Driven Industries.</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              We provide executive-level engineering strategy and disciplined technical oversight across complex systems, digital infrastructure, and performance-critical operations.
            </p>
            <Button onClick={openModal} size="lg">Request a Technical Consultation</Button>
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
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-6">Advisory Model</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Our advisory model enables engagement at the executive strategy level or embedded participation within enterprise engineering programs.
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We align disciplined system architecture with measurable business outcomes — supporting modernization initiatives, executive technology roadmaps, and long-term engineering strategy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Engagement</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">Engagement Model</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed">
              Engagements frequently span multi-system modernization initiatives, enterprise technology roadmaps, and performance-critical infrastructure programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {ENGAGEMENT_MODEL.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-10"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="block text-3xl font-black text-[#AEE37B] opacity-25 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-black tracking-tight text-[var(--text-primary)] mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">Core Technical Capabilities</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8 group"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="w-6 h-0.5 bg-[#AEE37B] mb-5" />
                <h3 className="text-base font-black tracking-tight text-[var(--text-primary)] mb-3">{cap.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Industries</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-10">Representative Industry Focus</h2>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((ind, i) => (
                <motion.span
                  key={ind}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase border border-[var(--border-color)] text-[var(--text-secondary)]"
                >
                  {ind}
                </motion.span>
              ))}
            </div>
          </motion.div>
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Advisory Model</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">
              Delivered Through Senior Engineering Leadership
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-10 max-w-lg mx-auto">
              Engagements are delivered through senior engineering leadership aligned to formalized advisory mandates.
            </p>
            <Button onClick={openModal} size="lg">Request a Technical Consultation</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
