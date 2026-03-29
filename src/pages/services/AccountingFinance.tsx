import { motion } from 'framer-motion';
import { PageTransition } from '../../components/ui/PageTransition';
import { Button } from '../../components/ui/Button';
import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';

export function AccountingFinance() {
  const { openModal } = useModal();
  const { t, tArray } = useTranslation();
  const whoItsForItems = tArray('accountingFinance.whoItsFor.items');
  const deliverables = [0, 1, 2].map((i) => ({
    title: t(`accountingFinance.deliverables.items.${i}.title`),
    items: tArray(`accountingFinance.deliverables.items.${i}.list`),
  }));
  const tiers = [0, 1, 2].map((i) => ({
    name: t(`accountingFinance.engagement.tiers.${i}.name`),
    desc: t(`accountingFinance.engagement.tiers.${i}.desc`),
  }));

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative py-28 lg:py-40 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-2">{t('accountingFinance.hero.label')}</p>
            <p className="text-xs font-medium tracking-widest uppercase text-white/40 mb-6">{t('accountingFinance.hero.sublabel')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-8">
              {t('accountingFinance.hero.title1')}<br />
              <span className="text-[#AEE37B]">{t('accountingFinance.hero.title2')}</span>
            </h1>
            <p className="text-base text-white/50 leading-relaxed mb-10 max-w-2xl">
              {t('accountingFinance.hero.description')}
            </p>
            <Button onClick={openModal} size="lg" variant="pill">{t('accountingFinance.hero.cta')}</Button>
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
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('accountingFinance.overview.label')}</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {t('accountingFinance.overview.description')}
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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('accountingFinance.deliverables.label')}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t('accountingFinance.deliverables.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {deliverables.map((del, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="w-6 h-0.5 bg-[#AEE37B] mb-5" />
                <h3 className="text-sm font-semibold tracking-tight text-[var(--text-primary)] mb-4">{del.title}</h3>
                <ul className="space-y-2">
                  {del.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="w-1 h-1 rounded-full bg-[#AEE37B] shrink-0 mt-1.5" />
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
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('accountingFinance.whoItsFor.label')}</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-8">{t('accountingFinance.whoItsFor.heading')}</h2>
              <ul className="space-y-3">
                {whoItsForItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AEE37B] shrink-0 mt-1.5" />
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
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('accountingFinance.engagement.label')}</p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-8">{t('accountingFinance.engagement.heading')}</h2>
              <div className="space-y-px" style={{ backgroundColor: 'var(--border-color)' }}>
                {tiers.map((tier, i) => (
                  <div key={i} className="p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-1 text-[#AEE37B] shrink-0"
                        style={{ backgroundColor: 'rgba(174,227,123,0.08)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{tier.name}</h3>
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
      <section className="py-24" style={{ backgroundColor: 'var(--bg-dark-section)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              {t('accountingFinance.cta.heading')}
            </h2>
            <Button onClick={openModal} size="lg" variant="pill">{t('accountingFinance.cta.button')}</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
