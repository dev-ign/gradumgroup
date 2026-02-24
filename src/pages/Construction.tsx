import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';

const SERVICES = [
  {
    title: 'Structural Engineering & Floorplans',
    items: ['Structural system design', 'Reinforcement detailing', 'Load and performance analysis', 'Technical plan development'],
  },
  {
    title: 'Geotechnical Investigation',
    items: ['Soil evaluation coordination', 'Geotechnical analysis', 'Foundation recommendations', 'Site risk assessment'],
  },
  {
    title: 'Budgeting & Cost Planning',
    items: ['Budget framework development', 'Cost estimation and control', 'Resource allocation planning', 'Stakeholder financial coordination'],
  },
  {
    title: 'Architectural Design',
    items: ['Conceptual design development', 'Technical drawing preparation', 'Regulatory alignment', 'Construction documentation'],
  },
  {
    title: 'Interior Design',
    items: ['Functional layout planning', 'Material and finish selection', 'Implementation oversight'],
  },
];

const PROJECT_MODEL = [
  { num: '01', title: 'Site & Structural Assessment' },
  { num: '02', title: 'Design & Technical Planning' },
  { num: '03', title: 'Budget Alignment' },
  { num: '04', title: 'Coordinated Execution' },
];

export function Construction() {
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
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#AEE37B' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">Gradum Construction</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Engineered Development<br />
              <span className="text-[#AEE37B]">for the Dominican Republic.</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              Structural, architectural, and planning services delivered with technical rigor and engineering discipline.
            </p>
            <Button onClick={openModal} size="lg">Discuss a Project</Button>
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
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-6">
                Governed Engineering Execution
              </h2>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Gradum Construction delivers project-based architectural and engineering services across the Dominican Republic, operating under licensed engineering standards and governed execution models.
                </p>
                <p>
                  Our approach integrates structural design, soil analysis, cost planning, and coordinated execution — ensuring safety, regulatory compliance, and long-term structural performance in a region where engineering precision is critical.
                </p>
                <p>
                  Projects are executed under licensed local engineering supervision and regulatory alignment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Services</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">Core Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="block text-3xl font-black text-[#AEE37B] opacity-25 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-base font-black tracking-tight text-[var(--text-primary)] mb-4">{svc.title}</h3>
                <ul className="space-y-2">
                  {svc.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="w-1 h-1 rounded-full bg-[#AEE37B] flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seismic Initiative */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-[#AEE37B]/30 p-10 max-w-3xl"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#AEE37B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#AEE37B]" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#AEE37B]">In Development</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-[var(--text-primary)] mb-4">
              Seismic & Soil-Focused Engineering
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              In response to the structural and seismic realities of the Dominican Republic, Gradum is developing an engineering-focused analytical platform to support:
            </p>
            <ul className="space-y-2 mb-4">
              {['Advanced soil studies', 'Seismic analysis', 'Structural risk modeling'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-1 h-1 rounded-full bg-[#AEE37B]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              This initiative reflects our long-term commitment to safety, structural validation, and engineering precision in local development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Model */}
      <section className="py-24" style={{ backgroundColor: '#0A2924' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Methodology</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Project Model</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#1b6259' }}>
            {PROJECT_MODEL.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8"
                style={{ backgroundColor: '#0A2924' }}
              >
                <span className="block text-4xl font-black text-[#AEE37B] opacity-30 mb-4">{step.num}</span>
                <h3 className="text-sm font-bold tracking-tight text-white">{step.title}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Button onClick={openModal} size="lg">Discuss Your Development Mandate</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
