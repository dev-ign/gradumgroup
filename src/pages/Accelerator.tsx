import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';

export function Accelerator() {
  const { openModal } = useModal();

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ backgroundColor: '#0A2924' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(174,227,123,1) 1px, transparent 1px), linear-gradient(90deg, rgba(174,227,123,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#AEE37B' }} />
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B]">Gradum Accelerator</p>
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 border border-[#AEE37B]/30 text-[#AEE37B]/70">
                Coming Soon
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Venture Development<br />Within a<br />
              <span className="text-[#AEE37B]">Structured Platform.</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              A selective initiative launching in a future phase as part of Gradum's disciplined regional expansion.
            </p>
            <Button onClick={openModal} size="lg" variant="outline">Request Information</Button>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Overview</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-6">
                A Disciplined Approach to Venture Development
              </h2>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Gradum Accelerator is a planned venture development initiative aligned with the broader Gradum advisory and execution platform.
                </p>
                <p>
                  Rather than traditional incubation models, the Accelerator will operate through formalized advisory mandates — integrating engineering, financial governance, and operational discipline into long-term venture development.
                </p>
                <p>
                  Initial launch will follow the continued expansion of Gradum Consulting and Construction operations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col justify-center"
            >
              <div
                className="p-10 border border-[var(--border-color)]"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="space-y-6">
                  {[
                    { label: 'Model', value: 'Formalized advisory mandates' },
                    { label: 'Approach', value: 'Engineering + financial governance + operational discipline' },
                    { label: 'Timeline', value: 'Future phase launch' },
                    { label: 'Geography', value: 'Regional expansion — Latin America & North America' },
                  ].map(item => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-secondary)]">{item.label}</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ backgroundColor: '#0A2924' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
              Express Interest
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-8">
              Stay informed on the Gradum Accelerator launch timeline and program details.
            </p>
            <Button onClick={openModal} size="lg">Express Interest</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
