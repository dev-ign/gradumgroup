import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { RegionalFlagCarousel } from '../components/ui/RegionalFlagCarousel';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { imageSizes } from '../data/imageSizes';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { homeContent, localize, platformLandings } from '../data/siteContent';
import { createStaggerVariants, motionTokens } from '../motion/presets';

export function Home() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const [heroLead, heroFinish] = l(homeContent.hero.title).split('. ');
  const regionalParts = l(homeContent.hero.regional).split(/(North America|Latin America|Norteamérica|América Latina)/g);
  const disciplines = [
    { ...platformLandings.consulting, href: '/consulting', image: homeContent.imagery.consulting },
    { ...platformLandings.construction, href: '/construction', image: homeContent.imagery.construction },
    { ...platformLandings.services, href: '/services', image: homeContent.imagery.services },
  ];

  return (
    <PageTransition>
      <article className="marketing-page home-page">
        <section className="home-hero section-shell">
          <StaggerGroup className="home-hero__copy">
            <Reveal>
              <h1><span>{heroLead}.</span><span>{heroFinish}</span></h1>
            </Reveal>
            <Reveal>
              <p className="home-hero__description">{l(homeContent.hero.description)}</p>
            </Reveal>
            <Reveal>
              <button className="pill-button home-hero__cta" onClick={openModal}>{lang === 'es' ? 'Iniciar una Conversación' : 'Start a Conversation'}</button>
            </Reveal>
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

        <section className="disciplines section-shell">
          <StaggerGroup trigger="viewport" className="section-heading">
            <Reveal><h2>{l(homeContent.disciplines.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.disciplines.description)}</p></Reveal>
          </StaggerGroup>
          <StaggerGroup trigger="viewport" className="discipline-grid">
            {disciplines.map((item) => (
              <Reveal className="discipline-card-reveal" key={item.href}>
                <Link className={`discipline-card family-${item.family}`} to={item.href}>
                  <OptimizedImage src={item.image} alt="" sizes={imageSizes.card} loading="lazy" decoding="async" />
                  <h3>{l(item.eyebrow).replace('Gradum ', '')}</h3>
                  <p>{l(item.description)}</p>
                  <span>{lang === 'es' ? 'Explorar' : 'Explore'} {l(item.eyebrow).replace('Gradum ', '')} →</span>
                </Link>
              </Reveal>
            ))}
          </StaggerGroup>
        </section>

        <StaggerGroup as="section" trigger="viewport" className="home-insight">
          <Reveal><h2>{l(homeContent.insight.title)}</h2></Reveal>
          <Reveal><p>{l(homeContent.insight.description)}</p></Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="latam-section section-shell">
          <StaggerGroup trigger="inherit">
            <Reveal><h2>{l(homeContent.latam.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.latam.description)}</p></Reveal>
          </StaggerGroup>
          <Reveal variant="image" className="latam-section__visual"><img src="/assets/figma/latam-flags.png" alt="Flags of countries served across the Americas" /></Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="home-paths section-shell">
          <Reveal className="home-path-reveal"><Link to="/ventures" className="home-path home-path--dark"><h2>{l(homeContent.ventures.title)}</h2><p>{l(homeContent.ventures.description)}</p><span>{lang === 'es' ? 'Explorar Ventures' : 'Explore Ventures'} →</span></Link></Reveal>
          <Reveal className="home-path-reveal"><Link to="/insights" className="home-path"><h2>{l(homeContent.insights.title)}</h2><p>{l(homeContent.insights.description)}</p><span>{lang === 'es' ? 'Explorar Perspectivas' : 'Explore Insights'} →</span></Link></Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="home-cta section-shell">
          <StaggerGroup trigger="inherit">
            <Reveal><h2>{l(homeContent.cta.title)}</h2></Reveal>
            <Reveal><p>{l(homeContent.cta.description)}</p></Reveal>
            <Reveal><button className="pill-button" onClick={openModal}>{lang === 'es' ? 'Iniciar una Conversación' : 'Start a Conversation'}</button></Reveal>
          </StaggerGroup>
          <Reveal variant="image" className="home-cta__visual"><OptimizedImage src={homeContent.imagery.cta} alt={l(homeContent.imagery.ctaAlt)} loading="lazy" decoding="async" /></Reveal>
        </StaggerGroup>
      </article>
    </PageTransition>
  );
}
