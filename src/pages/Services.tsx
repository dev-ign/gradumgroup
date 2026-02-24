import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n/useTranslation';

const PRACTICE_AREA_ROUTES = ['/services/accounting-finance', '/services/marketing-media'] as const;

export function Services() {
  const { openModal } = useModal();
  const { t } = useTranslation();

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
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#AEE37B' }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">{t('services.hero.label')}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              {t('services.hero.title1')}<br />
              <span className="text-[#AEE37B]">{t('services.hero.title2')}</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              {t('services.hero.description')}
            </p>
            <Button onClick={openModal} size="lg">{t('services.hero.cta')}</Button>
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
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('services.overview.label')}</p>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>{t('services.overview.p1')}</p>
                <p>{t('services.overview.p2')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('services.practiceAreas.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">{t('services.practiceAreas.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-10 flex flex-col group relative"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#AEE37B] group-hover:w-full transition-all duration-500" />
                <span className="block text-3xl font-black text-[#AEE37B] opacity-25 mb-4">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-black tracking-tight text-[var(--text-primary)] mb-2">{t(`services.practiceAreas.areas.${i}.name`)}</h3>
                <p className="text-sm font-semibold text-[#AEE37B] mb-4">{t(`services.practiceAreas.areas.${i}.tagline`)}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">{t(`services.practiceAreas.areas.${i}.desc`)}</p>
                <Link
                  to={PRACTICE_AREA_ROUTES[i]}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#AEE37B] hover:gap-4 transition-all duration-200"
                >
                  {t(`services.practiceAreas.areas.${i}.cta`)} <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('services.engagement.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">{t('services.engagement.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-8"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <span className="block text-4xl font-black text-[#AEE37B] opacity-30 mb-4">{t(`services.engagement.steps.${i}.num`)}</span>
                <h3 className="text-sm font-black tracking-tight text-[var(--text-primary)] mb-2">{t(`services.engagement.steps.${i}.title`)}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t(`services.engagement.steps.${i}.desc`)}</p>
              </motion.div>
            ))}
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
              {t('services.cta.heading')}
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-10 max-w-md mx-auto">
              {t('services.cta.description')}
            </p>
            <Button onClick={openModal} size="lg">{t('services.hero.cta')}</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
