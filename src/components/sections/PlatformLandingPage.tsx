import { Link } from 'react-router-dom';
import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { localize, type PlatformLandingContent } from '../../data/siteContent';

interface PlatformLandingPageProps {
  content: PlatformLandingContent;
}

export function PlatformLandingPage({ content }: PlatformLandingPageProps) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);

  return (
    <PageTransition>
      <article className={`marketing-page family-${content.family}`}>
        <section className="platform-hero section-shell">
          <StaggerGroup className="platform-hero__copy">
            <Reveal><p className="eyebrow platform-eyebrow">{l(content.eyebrow)}</p></Reveal>
            <Reveal><h1>{l(content.title)}</h1></Reveal>
            <Reveal><p className="platform-hero__description">{l(content.description)}</p></Reveal>
            <Reveal><div className="button-row">
              <a className="outline-button" href="#explore">{l(content.secondaryCta)}</a>
              <button className="pill-button" onClick={openModal}>{l(content.primaryCta)}</button>
            </div></Reveal>
          </StaggerGroup>
          <Reveal trigger="mount" variant="image" delay={0.24} className={`platform-hero__media platform-hero__media--${content.heroImages.length}`}>
            {content.heroImages.map((image, index) => <img key={image} src={image} alt="" className={`media-${index + 1}`} />)}
          </Reveal>
        </section>

        <StaggerGroup as="section" trigger="viewport" id="explore" className="landing-cards section-shell" stagger={0.06}>
          {content.cards.map((card) => (
            <Reveal className="landing-card-reveal" key={card.href}>
              <Link to={card.href} className="landing-card">
                {card.image && <img src={card.image} alt="" />}
                <div>
                  <h2>{l(card.title)}</h2>
                  <p>{l(card.description)}</p>
                  <span className="arrow-link">{lang === 'es' ? 'Explorar' : 'Explore'} {l(card.title)} →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </StaggerGroup>

        <section className={`platform-statement platform-statement--${content.family}`}>
          {content.family === 'construction' && (
            <div className="platform-statement__elevation" aria-hidden="true">
              <div>{Array.from({ length: 16 }, (_, index) => <span key={index} />)}</div>
            </div>
          )}
          {content.family === 'services' && (
            <div className="platform-statement__growth" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
            </div>
          )}
          <StaggerGroup trigger="viewport" className="section-shell platform-statement__inner">
            <Reveal><h2>{l(content.statement)}</h2></Reveal>
            <Reveal><p className="platform-statement__body">{l(content.statementBody)}</p></Reveal>
          </StaggerGroup>
        </section>

        {content.toolsTitle && (
          <StaggerGroup as="section" trigger="viewport" className="tools-section section-shell">
            <Reveal>
              <h2>{l(content.toolsTitle)}</h2>
              <p>{content.toolsBody ? l(content.toolsBody) : ''}</p>
              <div className="tool-pills">{content.tools?.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </Reveal>
            <Reveal variant="image" className="schematic" aria-hidden>
              <small>MODEL — RUN 018</small><span className="node node-1" /><span className="node node-2" /><span className="node node-3" /><span className="node node-4" />
              <i className="line line-1" /><i className="line line-2" /><i className="line line-3" />
            </Reveal>
          </StaggerGroup>
        )}

        <StaggerGroup as="section" trigger="viewport" className="explore-band">
          <Reveal><h2>{lang === 'es' ? `Explorar ${l(content.eyebrow).replace('Gradum ', '')}` : `Explore ${l(content.eyebrow).replace('Gradum ', '')}`}</h2></Reveal>
          <Reveal><div className="explore-band__links">{content.cards.map((card) => <Link key={card.href} to={card.href}>{l(card.title)} →</Link>)}</div></Reveal>
          <Reveal><button className="pill-button" onClick={openModal}>{l(content.primaryCta)}</button></Reveal>
        </StaggerGroup>
      </article>
    </PageTransition>
  );
}
