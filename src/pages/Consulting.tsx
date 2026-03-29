import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n/useTranslation';

export function Consulting() {
  const { openModal } = useModal();
  const { t, tArray } = useTranslation();
  const industries = tArray('consulting.industries.list');

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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-6">{t('consulting.hero.label')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-8">
              {t('consulting.hero.title1')}<br />{t('consulting.hero.title2')}<br />
              <span className="text-[#AEE37B]">{t('consulting.hero.title3')}</span>
            </h1>
            <p className="text-base text-white/50 leading-relaxed mb-10 max-w-2xl">
              {t('consulting.hero.description')}
            </p>
            <Button onClick={openModal} size="lg" variant="pill">{t('consulting.hero.cta')}</Button>
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
              <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('consulting.overview.label')}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-6">{t('consulting.overview.heading')}</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {t('consulting.overview.p1')}
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {t('consulting.overview.p2')}
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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('consulting.engagement.label')}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t('consulting.engagement.heading')}</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed">
              {t('consulting.engagement.intro')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-10"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="block text-3xl font-bold text-[#AEE37B] opacity-25 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)] mb-3">{t(`consulting.engagement.items.${i}.title`)}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(`consulting.engagement.items.${i}.desc`)}</p>
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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('consulting.capabilities.label')}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">{t('consulting.capabilities.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <div className="w-6 h-0.5 bg-[#AEE37B] mb-5" />
                <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)] mb-3">{t(`consulting.capabilities.items.${i}.title`)}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(`consulting.capabilities.items.${i}.desc`)}</p>
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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-6">{t('consulting.industries.label')}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-10">{t('consulting.industries.heading')}</h2>
            <div className="flex flex-wrap gap-2.5">
              {industries.map((ind, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full text-[var(--text-secondary)]"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#AEE37B] inline-block" />
                  {ind}
                </motion.span>
              ))}
            </div>
          </motion.div>
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
            <p className="text-xs font-medium tracking-widest uppercase text-[#AEE37B] mb-4">{t('consulting.cta.label')}</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              {t('consulting.cta.heading')}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-10 max-w-lg mx-auto">
              {t('consulting.cta.description')}
            </p>
            <Button onClick={openModal} size="lg" variant="pill">{t('consulting.hero.cta')}</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
