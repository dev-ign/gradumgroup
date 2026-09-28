import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/ui/PageTransition';
import { RegionalFlagCarousel } from '../components/ui/RegionalFlagCarousel';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
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
    { ...platformLandings.consulting, href: '/consulting', image: '/assets/figma/home-consulting.png' },
    { ...platformLandings.construction, href: '/construction', image: '/assets/figma/home-construction.png' },
    { ...platformLandings.services, href: '/services', image: '/assets/figma/home-services.png' },
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
            <Reveal variant="image" className="home-hero__image home-hero__image--portrait"><img src="/assets/figma/home-hero-portrait.png" alt="Consulting professional" width="319" height="389" loading="eager" fetchPriority="high" /></Reveal>
            <Reveal variant="image" className="home-hero__image home-hero__image--construction"><img src="/assets/figma/home-hero-construction.png" alt="Construction professional" width="287" height="221" loading="eager" /></Reveal>
            <Reveal variant="image" className="home-hero__image home-hero__image--developer"><img src="/assets/figma/home-hero-developer.png" alt="Software developer" width="287" height="249" loading="eager" /></Reveal>
          </StaggerGroup>
        </section>

        <section className="disciplines section-shell">
          <Reveal trigger="viewport" className="section-heading">
            <h2>{l(homeContent.disciplines.title)}</h2>
            <p>{l(homeContent.disciplines.description)}</p>
          </Reveal>
          <StaggerGroup trigger="viewport" className="discipline-grid" stagger={0.06}>
            {disciplines.map((item) => (
              <Reveal className="discipline-card-reveal" key={item.href}>
                <Link className={`discipline-card family-${item.family}`} to={item.href} style={{ backgroundImage: `linear-gradient(145deg, rgba(0,0,0,.7), rgba(10,41,36,.28)), url(${item.image})` }}>
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
          <Reveal><h2>{l(homeContent.latam.title)}</h2><p>{l(homeContent.latam.description)}</p></Reveal>
          <Reveal variant="image" className="latam-section__visual"><img src="/assets/figma/latam-flags.png" alt="Flags of countries served across the Americas" /></Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="home-paths section-shell">
          <Reveal className="home-path-reveal"><Link to="/ventures" className="home-path home-path--dark"><h2>{l(homeContent.ventures.title)}</h2><p>{l(homeContent.ventures.description)}</p><span>{lang === 'es' ? 'Explorar Ventures' : 'Explore Ventures'} →</span></Link></Reveal>
          <Reveal className="home-path-reveal"><Link to="/insights" className="home-path"><h2>{l(homeContent.insights.title)}</h2><p>{l(homeContent.insights.description)}</p><span>{lang === 'es' ? 'Explorar Perspectivas' : 'Explore Insights'} →</span></Link></Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="home-cta section-shell">
          <Reveal><h2>{l(homeContent.cta.title)}</h2><p>{l(homeContent.cta.description)}</p><button className="pill-button" onClick={openModal}>{lang === 'es' ? 'Iniciar una Conversación' : 'Start a Conversation'}</button></Reveal>
          <Reveal variant="image" className="home-cta__visual"><img src="/assets/figma/home-cta.png" alt="Team collaborating on a digital product" /></Reveal>
        </StaggerGroup>
      </article>
    </PageTransition>
  );
}
