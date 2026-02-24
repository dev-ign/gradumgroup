import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Button } from '../../components/ui/Button';
import { useModal } from '../../context/ModalContext';

const DELIVERABLES = [
  {
    title: 'Financial Reporting & Control',
    items: [
      'Bookkeeping execution and supervisory review',
      'Monthly financial statement preparation and validation',
      'Reporting alignment and documentation control',
      'Reconciliation management and monitoring',
    ],
  },
  {
    title: 'Compliance & Administrative Execution',
    items: [
      'Payroll processing and coordination',
      'Tax compliance and filing execution',
      'Regulatory reporting support',
      'Vendor payment administration and controls',
    ],
  },
  {
    title: 'Planning & Financial Structure',
    items: [
      'Budget framework development',
      'Cash flow forecasting and oversight',
      'Financial planning coordination',
      'Operational finance structuring',
    ],
  },
];

const WHO_ITS_FOR = [
  'Founder-led, scaling, and mid-market operating businesses in the Dominican Republic',
  'Growing organizations requiring internal accounting infrastructure',
  'Regulated operators requiring local compliance management',
  'International businesses with Dominican Republic operations',
];

const TIERS = [
  { name: 'Essential', desc: 'Core accounting execution and compliance management.' },
  { name: 'Growth', desc: 'Enhanced reporting visibility, structured budgeting, and financial alignment.' },
  { name: 'Enterprise', desc: 'Comprehensive oversight, internal control frameworks, and multi-entity coordination.' },
];

export function AccountingFinance() {
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
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-2">Gradum Services</p>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#94b5b0] mb-6">Accounting & Finance</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              Financial Structure.<br />
              <span className="text-[#AEE37B]">Operational Clarity.</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              Gradum delivers structured financial infrastructure and internal accounting execution designed to strengthen reporting integrity, regulatory alignment, and disciplined financial control.
            </p>
            <Button onClick={openModal} size="lg">Request a Consultation</Button>
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
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Gradum supports organizations operating in the Dominican Republic requiring reliable reporting, regulatory alignment, and structured financial governance. Our internal accounting team operates under defined workflows, supervisory controls, and measurable reporting standards — ensuring financial visibility and operational discipline at every stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Deliverables</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">What We Deliver</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {DELIVERABLES.map((del, i) => (
              <motion.div
                key={del.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="w-6 h-0.5 bg-[#AEE37B] mb-5" />
                <h3 className="text-sm font-black tracking-tight text-[var(--text-primary)] mb-4">{del.title}</h3>
                <ul className="space-y-2">
                  {del.items.map(item => (
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

      {/* Who It's For */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Target</p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] mb-8">Who It's For</h2>
              <ul className="space-y-3">
                {WHO_ITS_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE37B] flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">Engagement</p>
              <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] mb-8">Engagement Structure</h2>
              <div className="space-y-px" style={{ backgroundColor: 'var(--border-color)' }}>
                {TIERS.map((tier, i) => (
                  <div key={tier.name} className="p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-[#AEE37B]/10 text-[#AEE37B] flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-sm font-black text-[var(--text-primary)] mb-1">{tier.name}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{tier.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Strengthen Your Financial Infrastructure
            </h2>
            <Button onClick={openModal} size="lg">Request a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
