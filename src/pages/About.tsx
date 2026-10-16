import { useEffect, useState } from 'react';
import { PageTransition } from '../components/ui/PageTransition';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { aboutContent, localize } from '../data/siteContent';
import { motionTokens } from '../motion/presets';

export function About() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const [stackedDivisions, setStackedDivisions] = useState(() => window.matchMedia('(max-width: 900px)').matches);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const updateLayout = () => setStackedDivisions(query.matches);
    query.addEventListener('change', updateLayout);
    return () => query.removeEventListener('change', updateLayout);
  }, []);

  return (
    <PageTransition>
      <article className="marketing-page about-page">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero__decoration" aria-hidden="true">
            <img src="/assets/figma/about-hero-arrow.svg" alt="" width="1073" height="1073" />
          </div>
          <StaggerGroup className="about-hero__intro section-shell">
            <Reveal>
              <h1 id="about-title"><span>{l(aboutContent.titleLead)}</span>{' '}<span>{l(aboutContent.titleAccent)}</span></h1>
            </Reveal>
            <Reveal><p>{l(aboutContent.intro)}</p></Reveal>
          </StaggerGroup>
        </section>

        <section className="about-who section-shell" aria-labelledby="about-who-title">
          <StaggerGroup trigger="viewport" className="about-section-heading">
            <Reveal><p className="eyebrow">{l(aboutContent.whoEyebrow)}</p></Reveal>
            <Reveal><h2 id="about-who-title">{l(aboutContent.whoTitle)}</h2></Reveal>
            {aboutContent.whoParagraphs.map((paragraph, index) => (
              <Reveal key={index}><p className="about-section-heading__body">{l(paragraph)}</p></Reveal>
            ))}
          </StaggerGroup>
        </section>

        <section className="about-structure section-shell" aria-labelledby="about-structure-title">
          <StaggerGroup trigger="viewport" className="about-section-heading">
            <Reveal><p className="eyebrow">{l(aboutContent.structureEyebrow)}</p></Reveal>
            <Reveal><h2 id="about-structure-title">{l(aboutContent.structureTitle)}</h2></Reveal>
          </StaggerGroup>
          <StaggerGroup
            trigger={stackedDivisions ? 'inherit' : 'viewport'}
            delayChildren={0}
            stagger={stackedDivisions ? 0 : motionTokens.stagger.standard}
            className="about-divisions"
          >
            {aboutContent.divisions.map((division) => (
              <Reveal as="article" trigger={stackedDivisions ? 'viewport' : 'inherit'} className="about-division" key={division.image}>
                <OptimizedImage
                  className="about-division__image"
                  src={division.image}
                  alt={l(division.imageAlt)}
                  sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1024px) 48vw, 390px"
                  loading="lazy"
                  decoding="async"
                />
                <h3>{l(division.title)}</h3>
                <p>{l(division.description)}</p>
              </Reveal>
            ))}
          </StaggerGroup>
          <Reveal trigger="viewport" className="about-structure__statement">
            <p>{l(aboutContent.structureStatement)}</p>
          </Reveal>
        </section>

        <div className="about-panels section-shell">
          <StaggerGroup as="article" trigger="viewport" className="about-panel about-panel--team">
            <div className="about-panel__copy">
              <Reveal><p className="eyebrow">{l(aboutContent.thinkingEyebrow)}</p></Reveal>
              <Reveal><h2>{l(aboutContent.thinkingTitle)}</h2></Reveal>
              <div className="about-panel__principles">
                {aboutContent.principles.map((principle) => (
                  <Reveal key={principle.title.en} className="about-panel__principle">
                    <h3>{l(principle.title)}</h3>
                    <p>{l(principle.description)}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </StaggerGroup>
          <StaggerGroup as="article" trigger="viewport" className="about-panel about-panel--regional">
            <div className="about-panel__copy">
              <Reveal><p className="eyebrow">{l(aboutContent.presenceEyebrow)}</p></Reveal>
              <Reveal><h2>{l(aboutContent.presenceTitle)}</h2></Reveal>
              {aboutContent.presenceParagraphs.map((paragraph, index) => (
                <Reveal key={index}><p className="about-panel__paragraph">{l(paragraph)}</p></Reveal>
              ))}
            </div>
          </StaggerGroup>
        </div>

        <section className="about-final" aria-labelledby="about-final-title">
          <StaggerGroup trigger="viewport" className="about-final__inner section-shell">
            <Reveal><h2 id="about-final-title">{l(aboutContent.ctaTitle)}</h2></Reveal>
            <Reveal><p>{l(aboutContent.ctaDescription)}</p></Reveal>
            <Reveal><Button variant="primary" onClick={openModal}>{l(aboutContent.ctaButton)}</Button></Reveal>
          </StaggerGroup>
        </section>
      </article>
    </PageTransition>
  );
}
