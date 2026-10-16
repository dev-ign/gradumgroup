import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { RegionalFlagCarousel } from '../components/ui/RegionalFlagCarousel';
import { HowWeWorkTimeline } from '../components/sections/HowWeWorkTimeline';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { imageSizes } from '../data/imageSizes';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { homeContent, localize } from '../data/siteContent';
import { siteFeatures } from '../data/navigation';
import { scrollToSection } from '../lib/lenis';
import { createStaggerVariants, motionTokens } from '../motion/presets';

export function Home() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const [stackedExpertise, setStackedExpertise] = useState(() => window.matchMedia('(max-width: 760px)').matches);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)');
    const updateLayout = () => setStackedExpertise(query.matches);
    query.addEventListener('change', updateLayout);
    return () => query.removeEventListener('change', updateLayout);
  }, []);

  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const [heroLead, heroFinish] = l(homeContent.hero.title).split('. ');
  const regionalParts = l(homeContent.hero.regional).split(/(North America|Latin America|Norteamérica|América Latina)/g);
  const disciplines = [
    { ...homeContent.disciplines.cards.consulting, family: 'consulting', href: '/consulting', image: homeContent.imagery.consulting },
    { ...homeContent.disciplines.cards.construction, family: 'construction', href: '/construction', image: homeContent.imagery.construction },
    { ...homeContent.disciplines.cards.services, family: 'services', href: '/services', image: homeContent.imagery.services },
  ];

  return (
    <PageTransition>
      <article className="marketing-page home-page">
        <section className="home-hero section-shell">
          <StaggerGroup className="home-hero__copy">
            <Reveal>
              <h1><span>{heroLead}.</span>{' '}<span>{heroFinish}</span></h1>
            </Reveal>
            <Reveal>
              <p className="home-hero__description">{l(homeContent.hero.description)}</p>
            </Reveal>
            <Reveal><div className="button-row home-hero__actions">
              <button className="pill-button home-hero__cta" onClick={openModal}>{l(homeContent.hero.primaryCta)}</button>
              <button className="outline-button home-hero__cta" onClick={() => scrollToSection('#expertise')}>{l(homeContent.hero.secondaryCta)}</button>
            </div></Reveal>
            <motion.div
              className="regional-support"
              variants={createStaggerVariants(0, motionTokens.stagger.standard)}
            >
              <Reveal>
                <p>{regionalParts.map((part, index) => /^(North America|Latin America|Norteamérica|América Latina)$/.test(part) ? <strong key={index}>{part}</strong> : part)}</p>
              </Reveal>
              <Reveal className="regional-support__carousel">
                <RegionalFlagCarousel lang={lang} />
              </Reveal>
            </motion.div>
          </StaggerGroup>
          <StaggerGroup
            className="home-hero__media"
            delayChildren={0.38}
            staggerChildren={motionTokens.stagger.image}
          >
            <Reveal variant="image" className="home-hero__image home-hero__image--portrait"><OptimizedImage src="/assets/figma/home-hero-portrait.png" alt="Consulting professional" sizes="319px" loading="eager" fetchPriority="high" /></Reveal>
            <Reveal variant="image" className="home-hero__image home-hero__image--construction"><OptimizedImage src="/assets/figma/home-hero-construction.png" alt="Construction professional" sizes="287px" loading="eager" /></Reveal>
            <Reveal variant="image" className="home-hero__image home-hero__image--developer"><OptimizedImage src="/assets/figma/home-hero-developer.png" alt="Software developer" sizes="287px" loading="eager" /></Reveal>
          </StaggerGroup>
        </section>

        <section className="disciplines section-shell" id="expertise">
          <StaggerGroup trigger="viewport" className="section-heading">
            <Reveal><h2>{l(homeContent.disciplines.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.disciplines.introduction)}</p></Reveal>
            <Reveal><p>{l(homeContent.disciplines.detail)}</p></Reveal>
          </StaggerGroup>
          <StaggerGroup
            trigger={stackedExpertise ? 'inherit' : 'viewport'}
            delayChildren={0}
            stagger={stackedExpertise ? 0 : motionTokens.stagger.image}
            amount={0.15}
            className="discipline-grid"
          >
            {disciplines.map((item) => (
              <Reveal
                trigger={stackedExpertise ? 'viewport' : 'inherit'}
                amount={0.15}
                className="discipline-card-reveal"
                key={item.href}
              >
                <Link className={`discipline-card family-${item.family}`} to={item.href}>
                  <OptimizedImage src={item.image} alt="" sizes={imageSizes.card} loading="lazy" decoding="async" />
                  <span className="discipline-card__category">{l(item.category)}</span>
                  <h3>{l(item.title)}</h3>
                  <p>{l(item.description)}</p>
                  <span className="discipline-card__cta">{l(item.cta)} →</span>
                </Link>
              </Reveal>
            ))}
          </StaggerGroup>
        </section>

        <HowWeWorkTimeline />

        <StaggerGroup as="section" trigger="viewport" className="latam-section section-shell">
          <StaggerGroup trigger="inherit" className="latam-section__copy">
            <Reveal><h2>{l(homeContent.latam.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.latam.introduction)}</p></Reveal>
            <Reveal><p>{l(homeContent.latam.detail)}</p></Reveal>
          </StaggerGroup>
          <Reveal variant="image" className="latam-section__visual">
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/optimized/glowing-americas-network-hub-640.webp 640w, /assets/optimized/glowing-americas-network-hub-960.webp 960w"
                sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 900px) 520px, (max-width: 1350px) 60vw, 700px"
              />
              <img
                src="/Glowing%20Americas%20Network%20Hub.png"
                alt={l(homeContent.imagery.networkMapAlt)}
                width="1774"
                height="887"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </Reveal>
        </StaggerGroup>

        {(siteFeatures.ventures || siteFeatures.insights) && (
          <StaggerGroup as="section" trigger="viewport" className={`home-paths section-shell${siteFeatures.ventures && siteFeatures.insights ? '' : ' home-paths--single'}`}>
            {siteFeatures.ventures && <Reveal className="home-path-reveal"><Link to="/ventures" className="home-path home-path--dark"><h2>{l(homeContent.ventures.title)}</h2><p>{l(homeContent.ventures.description)}</p><span>{lang === 'es' ? 'Explorar Ventures' : 'Explore Ventures'} →</span></Link></Reveal>}
            {siteFeatures.insights && <Reveal className="home-path-reveal"><Link to="/insights" className="home-path"><h2>{l(homeContent.insights.title)}</h2><p>{l(homeContent.insights.description)}</p><span>{lang === 'es' ? 'Explorar Perspectivas' : 'Explore Insights'} →</span></Link></Reveal>}
          </StaggerGroup>
        )}

        <StaggerGroup as="section" trigger="viewport" className="home-cta section-shell">
          <StaggerGroup trigger="inherit">
            <Reveal><h2>{l(homeContent.cta.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.cta.description)}</p></Reveal>
            <Reveal><button className="pill-button" onClick={openModal}>{l(homeContent.cta.button)}</button></Reveal>
          </StaggerGroup>
          <Reveal variant="image" className="home-cta__visual"><OptimizedImage src={homeContent.imagery.cta} alt={l(homeContent.imagery.ctaAlt)} loading="lazy" decoding="async" /></Reveal>
        </StaggerGroup>
      </article>
    </PageTransition>
  );
}
