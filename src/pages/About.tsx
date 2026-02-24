import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { useTranslation } from '../i18n/useTranslation';

export function About() {
  const { t, tArray } = useTranslation();
  const overviewParagraphs = tArray('about.overview');
  const principles = tArray('about.philosophy.principles');
  const engagementItems = tArray('about.engagement.items');
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">{t('about.hero.label')}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-[var(--text-primary)] mb-8">
              {t('about.hero.title1')}<br /><span className="text-[#AEE37B]">{t('about.hero.title2')}</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              {t('about.hero.intro')}
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
              {overviewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('about.platform.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">
              {t('about.platform.heading')}
            </h2>
          </motion.div>

          <div className="space-y-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row gap-6 p-8"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="sm:w-1/3">
                  <h3 className="text-base font-black tracking-tight text-[var(--text-primary)]">{t(`about.divisions.${i}.name`)}</h3>
                </div>
                <div className="sm:w-2/3">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(`about.divisions.${i}.desc`)}</p>
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
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">{t('about.philosophy.label')}</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
                {t('about.philosophy.heading')}
              </h2>
              <ul className="space-y-4">
                {principles.map((p, i) => (
                  <motion.li
                    key={i}
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
                {t('about.philosophy.closing')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">{t('about.engagement.label')}</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-10">
                {t('about.engagement.heading')}
              </h2>
              <p className="text-sm text-[#94b5b0] leading-relaxed mb-8">{t('about.engagement.intro')}</p>
              <ul className="space-y-4">
                {engagementItems.map((p, i) => (
                  <motion.li
                    key={i}
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
                  {t('about.engagement.closing1')}<br />
                  <span className="text-[#AEE37B]">{t('about.engagement.closing2')}</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
