import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n/useTranslation';

export function Accelerator() {
  const { openModal } = useModal();
  const { t, tRaw } = useTranslation();
  const modelItems = (tRaw<{ label: string; value: string }[]>('accelerator.model')) ?? [];

  return (
    <PageTransition>
      {/* Hero */}
      <section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ backgroundColor: 'var(--bg-dark-section)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B]">{t('accelerator.hero.label')}</p>
              <span className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 text-[#AEE37B]/70"
                style={{ border: '1px solid rgba(174,227,123,0.25)' }}>
                {t('accelerator.hero.badge')}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-8">
              {t('accelerator.hero.title1')}<br />{t('accelerator.hero.title2')}<br />
              <span className="text-[#AEE37B]">{t('accelerator.hero.title3')}</span>
            </h1>
            <p className="text-base text-white/50 leading-relaxed mb-10 max-w-2xl">
              {t('accelerator.hero.description')}
            </p>
            <Button onClick={openModal} size="lg" variant="pill">{t('accelerator.hero.cta')}</Button>
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
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('accelerator.overview.label')}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-6">
                {t('accelerator.overview.heading')}
              </h2>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>{t('accelerator.overview.p1')}</p>
                <p>{t('accelerator.overview.p2')}</p>
                <p>{t('accelerator.overview.p3')}</p>
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
                className="p-10"
                style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
              >
                <div className="space-y-6">
                  {modelItems.map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium tracking-widest uppercase text-[var(--text-secondary)]">{item.label}</span>
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
      <section className="py-24" style={{ backgroundColor: 'var(--bg-dark-section)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4">
              {t('accelerator.cta.heading')}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-8">
              {t('accelerator.cta.description')}
            </p>
            <Button onClick={openModal} size="lg" variant="pill">{t('accelerator.cta.button')}</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
