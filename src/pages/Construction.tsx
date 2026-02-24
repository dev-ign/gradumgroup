import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { Button } from '../components/ui/Button';
import { useModal } from '../context/ModalContext';
import { useTranslation } from '../i18n/useTranslation';

export function Construction() {
  const { openModal } = useModal();
  const { t, tArray } = useTranslation();
  const serviceItems = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`construction.services.items.${i}.title`),
    items: tArray(`construction.services.items.${i}.list`),
  }));

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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-6">{t('construction.hero.label')}</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8">
              {t('construction.hero.title1')}<br />
              <span className="text-[#AEE37B]">{t('construction.hero.title2')}</span>
            </h1>
            <p className="text-base text-[#94b5b0] leading-relaxed mb-10 max-w-2xl">
              {t('construction.hero.description')}
            </p>
            <Button onClick={openModal} size="lg">{t('construction.hero.cta')}</Button>
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
              <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('construction.overview.label')}</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)] mb-6">
                {t('construction.overview.heading')}
              </h2>
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>{t('construction.overview.p1')}</p>
                <p>{t('construction.overview.p2')}</p>
                <p>{t('construction.overview.p3')}</p>
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('construction.services.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]">{t('construction.services.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border-color)' }}>
            {serviceItems.map((svc, i) => (
              <motion.div
                key={i}
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
                  {svc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
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
              <span className="text-xs font-bold tracking-widest uppercase text-[#AEE37B]">{t('construction.seismic.badge')}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-[var(--text-primary)] mb-4">
              {t('construction.seismic.heading')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              {t('construction.seismic.intro')}
            </p>
            <ul className="space-y-2 mb-4">
              {tArray('construction.seismic.list').map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span className="w-1 h-1 rounded-full bg-[#AEE37B]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {t('construction.seismic.closing')}
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
            <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#AEE37B] mb-4">{t('construction.projectModel.label')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">{t('construction.projectModel.heading')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#1b6259' }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-8"
                style={{ backgroundColor: '#0A2924' }}
              >
                <span className="block text-4xl font-black text-[#AEE37B] opacity-30 mb-4">{t(`construction.projectModel.steps.${i}.num`)}</span>
                <h3 className="text-sm font-bold tracking-tight text-white">{t(`construction.projectModel.steps.${i}.title`)}</h3>
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
            <Button onClick={openModal} size="lg">{t('construction.projectModel.cta')}</Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
