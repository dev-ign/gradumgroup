import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n/useTranslation';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const DIVISION_ROUTES = ['/consulting', '/construction', '/services', '/accelerator'] as const;
const DIVISION_AVAILABLE = [true, true, true, false] as const;

export function Home() {
  const { openModal } = useModal();
  const { t } = useTranslation();

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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6"
            >
              {t('home.hero.tagline')}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-[var(--text-primary)] mb-8"
            >
              {t('home.hero.title1')}<br />{t('home.hero.title2')}<br />
              <span className="text-[#AEE37B]">{t('home.hero.title3')}</span><br />{t('home.hero.title4')}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {t('home.hero.description')}
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button onClick={openModal} size="lg">
                {t('common.requestConsultation')}
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('home.platform.label')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)] max-w-2xl leading-tight">
              {t('home.platform.heading')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed">
              {t('home.platform.intro')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {DIVISION_ROUTES.map((to, i) => {
              const isAvailable = DIVISION_AVAILABLE[i];
              const isAccelerator = to === '/accelerator';
              const cardClassName = 'flex flex-col justify-between min-h-[220px] p-10';
              const linkClassName = isAvailable
                ? `${cardClassName} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)]`
                : cardClassName;
              const cardContent = (
                <>
                  {/* hover accent — only for available cards */}
                  {isAvailable && (
                    <>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: '#AEE37B', opacity: 0 }}
                      />
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#AEE37B] group-hover:w-full transition-all duration-500 pointer-events-none" />
                    </>
                  )}
                  {/* Accelerator featured: subtle gradient glow */}
                  {isAccelerator && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(174,227,123,0.12) 0%, rgba(174,227,123,0.04) 50%, transparent 100%)',
                        borderLeft: '3px solid rgba(174,227,123,0.5)',
                      }}
                    />
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)]">
                        {isAccelerator && (
                          <span className="relative flex-shrink-0 w-2 h-2">
                            <span className="absolute inset-0 rounded-full bg-[#AEE37B] animate-ping opacity-60" />
                            <span className="relative block w-2 h-2 rounded-full bg-[#AEE37B]" />
                          </span>
                        )}
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {!isAvailable && (
                        <span
                          className="text-[9px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 text-[#AEE37B]"
                          style={{ border: '1px solid rgba(174,227,123,0.35)', backgroundColor: 'rgba(174,227,123,0.08)' }}
                        >
                          {t('common.comingSoon').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-xl font-black tracking-tight mb-2 transition-colors duration-300 ${
                        isAccelerator ? 'text-[#AEE37B]' : 'text-[var(--text-primary)] group-hover:text-[#AEE37B]'
                      }`}
                    >
                      {t(`home.divisions.${i}.name`)}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(`home.divisions.${i}.tagline`)}</p>
                  </div>

                  {isAvailable && (
                    <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#AEE37B] group-hover:gap-4 transition-all duration-200">
                      {t('common.learnMore')}
                      <span>→</span>
                    </span>
                  )}
                  {isAccelerator && (
                    <p className="mt-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#AEE37B]/80">
                      {t('common.comingSoon')} — {t('nav.platform')}
                    </p>
                  )}
                </>
              );
              return (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    ...(isAccelerator && { boxShadow: 'inset 0 0 0 1px rgba(174,227,123,0.15)' }),
                  }}
                >
                  {isAvailable ? (
                    <Link to={to} className={linkClassName}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={cardClassName}>
                      {cardContent}
                    </div>
                  )}
                </motion.div>
              );
            })}
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('home.howWeWork.label')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-primary)]">
              {t('home.howWeWork.heading')}
            </h2>
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
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span className="block text-5xl font-black text-[#AEE37B] opacity-30 mb-4">{t(`home.howWeWork.steps.${i}.num`)}</span>
                <h3 className="text-base font-black tracking-tight text-[var(--text-primary)] mb-2">{t(`home.howWeWork.steps.${i}.title`)}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{t(`home.howWeWork.steps.${i}.desc`)}</p>
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('home.cta.label')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              {t('home.cta.heading')}
            </h2>
            <p className="text-sm text-[#94b5b0] leading-relaxed mb-10 max-w-lg">
              {t('home.cta.description')}
            </p>
            <Button onClick={openModal} variant="primary" size="lg">
              {t('common.requestConsultation')}
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
