import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';
import { OptimizedImage } from '../ui/OptimizedImage';
import { imageSizes } from '../../data/imageSizes';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { localize, type PlatformLandingContent } from '../../data/siteContent';
import { scrollToSection } from '../../lib/lenis';
import { motionTokens } from '../../motion/presets';
import { ConstructionAudiences, ConstructionIntroduction, ConstructionProcess } from './ConstructionSections';

interface PlatformLandingPageProps {
  content: PlatformLandingContent;
}

export function PlatformLandingPage({ content }: PlatformLandingPageProps) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const hasExpertiseHeading = Boolean(content.expertiseTitle);
  const constructionSections = content.constructionSections;
  const [stackedCards, setStackedCards] = useState(() => window.matchMedia('(max-width: 1180px)').matches);

  useEffect(() => {
    if (!hasExpertiseHeading) return;
    const query = window.matchMedia('(max-width: 1180px)');
    const updateLayout = () => setStackedCards(query.matches);
    query.addEventListener('change', updateLayout);
    return () => query.removeEventListener('change', updateLayout);
  }, [hasExpertiseHeading]);

  const cards = content.cards.map((card) => (
    <Reveal className="landing-card-reveal" trigger={hasExpertiseHeading && stackedCards ? 'viewport' : 'inherit'} amount={hasExpertiseHeading ? 0.2 : undefined} key={card.href}>
      <Link to={card.href} className="landing-card">
        {card.image && <OptimizedImage src={card.image} alt="" sizes={imageSizes.thumbnail} loading="lazy" decoding="async" />}
        <div>
          {hasExpertiseHeading && card.code && !constructionSections && <span className="item-code">{card.code}</span>}
          {hasExpertiseHeading ? <h3>{l(card.title)}</h3> : <h2>{l(card.title)}</h2>}
          {card.subtitle && <p className="landing-card__subtitle">{l(card.subtitle)}</p>}
          <p>{l(card.description)}</p>
          <span className="arrow-link">{card.cta ? l(card.cta) : `${lang === 'es' ? 'Explorar' : 'Explore'} ${l(card.title)} →`}</span>
        </div>
      </Link>
    </Reveal>
  ));

  const statementReveals = <>
    {content.statementEyebrow && <Reveal><p className="eyebrow">{l(content.statementEyebrow)}</p></Reveal>}
    {content.statement && <Reveal><h2>{l(content.statement)}</h2></Reveal>}
    {content.statementBody && <Reveal><p className="platform-statement__body">{l(content.statementBody)}</p></Reveal>}
    {content.statementBodyExtra && <Reveal><p className="platform-statement__body">{l(content.statementBodyExtra)}</p></Reveal>}
  </>;
  const primaryAction = <button className="pill-button" onClick={openModal}>{l(content.primaryCta)}</button>;
  const secondaryAction = content.secondaryCta && (content.secondaryHref
    ? <Link className="outline-button" to={content.secondaryHref}>{l(content.secondaryCta)}</Link>
    : content.family === 'services'
      ? <button className="outline-button" onClick={() => scrollToSection('#explore')}>{l(content.secondaryCta)}</button>
      : <a className="outline-button" href="#explore">{l(content.secondaryCta)}</a>);

  return (
    <PageTransition>
      <article className={`marketing-page family-${content.family}`}>
        <section className="platform-hero section-shell">
          <StaggerGroup className={`platform-hero__copy${content.eyebrow ? '' : ' platform-hero__copy--no-eyebrow'}`}>
            {content.eyebrow && <Reveal className="hero-eyebrow-anchor"><p className="eyebrow platform-eyebrow">{l(content.eyebrow)}</p></Reveal>}
            <Reveal><h1>{l(content.title)}</h1></Reveal>
            <Reveal><p className="platform-hero__description">{l(content.description)}</p></Reveal>
            <Reveal><div className="button-row">
              {primaryAction}{secondaryAction}
            </div></Reveal>
          </StaggerGroup>
          <Reveal trigger="mount" variant="image" delay={0.24} className={`platform-hero__media platform-hero__media--${content.heroImages.length}`}>
            {content.heroImages.map((image, index) => <OptimizedImage key={image} src={image} alt={l(content.heroImageAlts[index])} sizes={content.family === 'construction' ? imageSizes.constructionHero : imageSizes.hero} className={`media-${index + 1}`} decoding="async" loading="eager" fetchPriority={index === 0 ? 'high' : 'auto'} />)}
          </Reveal>
        </section>

        {constructionSections && <ConstructionIntroduction content={constructionSections} l={l} />}

        {hasExpertiseHeading ? (
          <section id="explore" className="landing-expertise section-shell">
            <StaggerGroup trigger="viewport" className="landing-expertise__heading">
              {content.expertiseEyebrow && <Reveal><p className="eyebrow">{l(content.expertiseEyebrow)}</p></Reveal>}
              <Reveal><h2>{l(content.expertiseTitle!)}</h2></Reveal>
            </StaggerGroup>
            <StaggerGroup
              trigger={stackedCards ? 'inherit' : 'viewport'}
              amount={hasExpertiseHeading ? 0.2 : undefined}
              delayChildren={0}
              stagger={stackedCards ? 0 : motionTokens.stagger.standard}
              className="landing-cards"
            >
              {cards}
            </StaggerGroup>
          </section>
        ) : (
          <StaggerGroup as="section" trigger="viewport" id="explore" className="landing-cards section-shell">{cards}</StaggerGroup>
        )}

        {constructionSections ? <ConstructionProcess content={constructionSections} l={l} /> : content.statement && (
          <section className={`platform-statement platform-statement--${content.family}`}>
            {content.family === 'services' ? (
              <div className="section-shell platform-statement__inner">
                <StaggerGroup trigger="viewport" amount={0.9} className="platform-statement__copy">{statementReveals}</StaggerGroup>
                <div className="platform-statement__growth" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
                </div>
              </div>
            ) : (
              <StaggerGroup trigger="viewport" className="section-shell platform-statement__inner">{statementReveals}</StaggerGroup>
            )}
          </section>
        )}

        {constructionSections && <ConstructionAudiences content={constructionSections} l={l} />}

        {content.toolsTitle && (
          <StaggerGroup as="section" trigger="viewport" className="tools-section section-shell">
            <StaggerGroup trigger="inherit">
              <Reveal><h2>{l(content.toolsTitle)}</h2></Reveal>
              <Reveal><p>{content.toolsBody ? l(content.toolsBody) : ''}</p></Reveal>
              <Reveal><div className="tool-pills">{content.tools?.map((tool) => <span key={tool.en}>{l(tool)}</span>)}</div></Reveal>
              {content.toolsCta && content.toolsHref && <Reveal><Link className="arrow-link tools-section__link" to={content.toolsHref}>{l(content.toolsCta)}</Link></Reveal>}
            </StaggerGroup>
            <Reveal variant="image" className="schematic" aria-hidden>
              <small>MODEL — RUN 018</small><span className="node node-1" /><span className="node node-2" /><span className="node node-3" /><span className="node node-4" />
              <i className="line line-1" /><i className="line line-2" /><i className="line line-3" />
            </Reveal>
          </StaggerGroup>
        )}

        {content.finalCtaTitle ? (
          <section className="explore-band explore-band--cta">
            <StaggerGroup trigger="viewport" amount={0.9} className="explore-band__content">
              <Reveal><h2>{l(content.finalCtaTitle)}</h2></Reveal>
              {content.finalCtaDescription && <Reveal><p>{l(content.finalCtaDescription)}</p></Reveal>}
              <Reveal><button className="pill-button" onClick={openModal}>{l(content.primaryCta)}</button></Reveal>
            </StaggerGroup>
          </section>
        ) : (
          <StaggerGroup as="section" trigger="viewport" className="explore-band">
            <Reveal><h2>{content.eyebrow ? `${lang === 'es' ? 'Explorar' : 'Explore'} ${l(content.eyebrow).replace('Gradum ', '')}` : (lang === 'es' ? 'Explorar' : 'Explore')}</h2></Reveal>
            <Reveal><div className="explore-band__links">{content.cards.map((card) => <Link key={card.href} to={card.href}>{l(card.title)} →</Link>)}</div></Reveal>
            <Reveal><button className="pill-button" onClick={openModal}>{l(content.primaryCta)}</button></Reveal>
          </StaggerGroup>
        )}
      </article>
    </PageTransition>
  );
}
