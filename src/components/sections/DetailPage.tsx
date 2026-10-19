import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';
import { OptimizedImage } from '../ui/OptimizedImage';
import { imageSizes } from '../../data/imageSizes';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { localize, type DetailPageContent } from '../../data/siteContent';
import { motionTokens } from '../../motion/presets';

interface DetailPageProps {
  content: DetailPageContent;
}

export function DetailPage({ content }: DetailPageProps) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const heroSplit = content.heroLayout === 'split' || content.layout === 'split' || content.layout === 'cards';
  const refinedService = content.family === 'services' && Boolean(content.variant);
  const splitApproach = Boolean(content.statementImage && (content.statementLayout === 'split' || (content.family === 'services' && content.layout === 'split')));
  const hasExpertiseHeading = Boolean(content.expertiseTitle);
  const [stackedFeatures, setStackedFeatures] = useState(() => window.matchMedia('(max-width: 1024px)').matches);

  useEffect(() => {
    if (!hasExpertiseHeading) return;
    const query = window.matchMedia('(max-width: 1024px)');
    const updateLayout = () => setStackedFeatures(query.matches);
    query.addEventListener('change', updateLayout);
    return () => query.removeEventListener('change', updateLayout);
  }, [hasExpertiseHeading]);

  const features = content.items.map((item, index) => (
    <Reveal
      as="article"
      trigger={refinedService || (hasExpertiseHeading && stackedFeatures) ? 'viewport' : 'inherit'}
      amount={refinedService ? 0.2 : undefined}
      delay={refinedService ? 0.12 + (index % (stackedFeatures ? 2 : 3)) * motionTokens.stagger.tight : 0}
      className="detail-feature"
      key={`${item.code ?? ''}-${item.title.en}`}
    >
      {item.image && <OptimizedImage src={item.image} alt="" sizes={imageSizes.card} loading="lazy" decoding="async" />}
      <div className="detail-feature__copy">
        {hasExpertiseHeading && item.code && <span className="item-code">{item.code}</span>}
        {hasExpertiseHeading ? <h3>{l(item.title)}</h3> : <h2>{l(item.title)}</h2>}
        <p>{l(item.description)}</p>
      </div>
    </Reveal>
  ));

  const finalCtaReveals = content.finalCtaTitle && <>
    <Reveal><h2>{l(content.finalCtaTitle)}</h2></Reveal>
    {content.finalCtaDescription && <Reveal><p>{l(content.finalCtaDescription)}</p></Reveal>}
    <Reveal><button className="pill-button" onClick={openModal}>{l(content.cta)}</button></Reveal>
  </>;

  return (
    <PageTransition>
      <article className={`marketing-page detail-page family-${content.family} detail-page--${content.layout}${content.variant ? ` detail-page--${content.variant}` : ''}`}>
        <section className={`detail-hero section-shell ${heroSplit ? 'detail-hero--split' : ''}`}>
          <StaggerGroup className="detail-hero__copy">
            {content.category ? (
              <Reveal className="hero-eyebrow-anchor"><div className="detail-hero__breadcrumb">
                <Link className="eyebrow platform-eyebrow" to={content.parentHref ?? '/services'}>{l(content.eyebrow)}</Link>
                <span aria-hidden="true">/</span>
                <span className="detail-hero__category">{l(content.category)}</span>
              </div></Reveal>
            ) : <Reveal className="hero-eyebrow-anchor"><p className="eyebrow platform-eyebrow">{l(content.eyebrow)}</p></Reveal>}
            <Reveal><h1>{l(content.title)}</h1></Reveal>
            <Reveal><p className="detail-hero__description">{l(content.description)}</p></Reveal>
            {content.heroCta && <Reveal><button className="pill-button" onClick={openModal}>{l(content.heroCta)}</button></Reveal>}
          </StaggerGroup>
          {content.image && <Reveal trigger="mount" variant="image" delay={content.heroLayout === 'split' ? 0.44 : 0.22} className="detail-hero__image-frame"><OptimizedImage className="detail-hero__image" src={content.image} alt={content.imageAlt ? l(content.imageAlt) : ''} sizes={content.heroLayout === 'split' ? imageSizes.splitHero : imageSizes.hero} decoding="async" loading="eager" fetchPriority="high" /></Reveal>}
        </section>

        {hasExpertiseHeading ? (
          <section className="service-expertise section-shell" aria-labelledby="service-expertise-title">
            <StaggerGroup trigger="viewport" className="service-expertise__heading">
              {content.expertiseEyebrow && <Reveal><p className="eyebrow">{l(content.expertiseEyebrow)}</p></Reveal>}
              <Reveal><h2 id="service-expertise-title">{l(content.expertiseTitle!)}</h2></Reveal>
            </StaggerGroup>
            <StaggerGroup
              trigger={refinedService || stackedFeatures ? 'inherit' : 'viewport'}
              amount={refinedService ? 0.2 : undefined}
              delayChildren={0}
              stagger={stackedFeatures ? 0 : motionTokens.stagger.standard}
              className={`detail-features detail-features--${content.layout} detail-features--services${content.items.length === 5 ? ' detail-features--five' : ''}`}
            >
              {features}
            </StaggerGroup>
          </section>
        ) : <StaggerGroup as="section" trigger="viewport" className={`detail-features section-shell detail-features--${content.layout}`}>{features}</StaggerGroup>}

        {content.statement && (
          <section className={`approach-band ${content.statementImage ? 'approach-band--image' : ''}${splitApproach ? ' approach-band--split' : ''}`}>
            {content.statementImage && !splitApproach && <OptimizedImage className="approach-band__background" src={content.statementImage} alt="" sizes={imageSizes.band} loading="lazy" decoding="async" />}
            <StaggerGroup trigger={refinedService ? 'inherit' : 'viewport'} className="approach-band__inner">
              {splitApproach && content.statementImage && <Reveal trigger={refinedService ? 'viewport' : 'inherit'} amount={refinedService ? 0.2 : undefined} variant="image" className="approach-band__visual"><OptimizedImage src={content.statementImage} alt="" loading="lazy" decoding="async" /></Reveal>}
              <StaggerGroup trigger={refinedService ? 'viewport' : 'inherit'} amount={refinedService ? 0.2 : undefined}>
                {content.statementEyebrow && <Reveal><p className="eyebrow">{l(content.statementEyebrow)}</p></Reveal>}
                <Reveal><h2>{l(content.statement)}</h2></Reveal>
                {content.approachBody?.map((paragraph, index) => <Reveal key={index}><p>{l(paragraph)}</p></Reveal>)}
                {!content.finalCtaTitle && <Reveal><button className="pill-button" onClick={openModal}>{l(content.cta)}</button></Reveal>}
              </StaggerGroup>
            </StaggerGroup>
          </section>
        )}

        {!content.statement && (
          <Reveal as="section" trigger="viewport" className="simple-cta"><button className="pill-button" onClick={openModal}>{l(content.cta)}</button></Reveal>
        )}

        {content.finalCtaTitle && (refinedService
            ? <section className="simple-cta service-final-cta"><StaggerGroup trigger="viewport" amount={content.variant === 'accounting' ? 0.9 : content.variant === 'legal' ? 0.2 : 0.45} className="service-final-cta__content">{finalCtaReveals}</StaggerGroup></section>
            : <StaggerGroup as="section" trigger="viewport" className="simple-cta service-final-cta">{finalCtaReveals}</StaggerGroup>
        )}
      </article>
    </PageTransition>
  );
}
