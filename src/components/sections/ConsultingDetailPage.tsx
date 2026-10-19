import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { imageSizes } from '../../data/imageSizes';
import { localize, type LocalizedText } from '../../data/siteContent';
import type { ConsultingDetailContent } from '../../data/consultingDetails';
import { motionTokens } from '../../motion/presets';
import { OptimizedImage } from '../ui/OptimizedImage';
import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';

type Localizer = (value: LocalizedText) => string;

function ConsultingHero({ hero, split, l }: { hero: ConsultingDetailContent['hero']; split: boolean; l: Localizer }) {
  return (
    <section className={`detail-hero section-shell${split ? ' detail-hero--split' : ''}`}>
      <StaggerGroup className="detail-hero__copy">
        <Reveal className="hero-eyebrow-anchor"><p className="eyebrow platform-eyebrow">{l(hero.label)}</p></Reveal>
        <Reveal><h1>{l(hero.title)}</h1></Reveal>
        <Reveal><p className="detail-hero__description">{l(hero.description)}</p></Reveal>
      </StaggerGroup>
      {hero.image && <Reveal trigger="mount" variant="image" delay={split ? 0.44 : 0.22} className="detail-hero__image-frame">
        <OptimizedImage className="detail-hero__image" src={hero.image} alt={hero.imageAlt ? l(hero.imageAlt) : ''} sizes={split ? imageSizes.splitHero : imageSizes.wideHero} decoding="async" loading="eager" fetchPriority="high" />
      </Reveal>}
    </section>
  );
}

function ConsultingCapabilities({ content, l, openModal }: { content: Extract<ConsultingDetailContent, { layout: 'capabilities' }>; l: Localizer; openModal: () => void }) {
  return <>
    <section className="detail-features section-shell detail-features--wide consulting-capabilities" aria-label={l(content.hero.label)}>
      {content.items.map((item, index) => (
        <Reveal as="article" trigger="viewport" amount={0.2} delay={(index % 2) * motionTokens.stagger.tight} className="detail-feature" key={item.title.en}>
          <h2>{l(item.title)}</h2>
          <p>{l(item.description)}</p>
        </Reveal>
      ))}
    </section>

    <section className="approach-band approach-band--image consulting-approach">
      <OptimizedImage className="approach-band__background" src={content.approach.image} alt="" sizes={imageSizes.band} loading="lazy" decoding="async" />
      <StaggerGroup trigger="viewport" className="approach-band__inner">
        <Reveal><h2>{l(content.approach.title)}</h2></Reveal>
        <Reveal><p>{l(content.approach.description)}</p></Reveal>
        <Reveal><button className="pill-button" onClick={openModal}>{l(content.approach.label)}</button></Reveal>
      </StaggerGroup>
    </section>
  </>;
}

function ConsultingIndustries({ content, l }: { content: Extract<ConsultingDetailContent, { layout: 'industries' }>; l: Localizer }) {
  return (
    <section className="detail-features section-shell detail-features--list consulting-industries" aria-label={l(content.hero.label)}>
      {content.items.map((item, index) => (
        <Reveal as="article" trigger="viewport" amount={0.2} delay={(index % 2) * motionTokens.stagger.tight} className="detail-feature" key={item.title.en}>
          <OptimizedImage src={item.image} alt={l(item.imageAlt)} sizes={imageSizes.industryRow} loading="lazy" decoding="async" />
          <div className="detail-feature__copy">
            <h2>{l(item.title)}</h2>
            <p>{l(item.description)}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function ConsultingProcess({ content, l }: { content: Extract<ConsultingDetailContent, { layout: 'process' }>; l: Localizer }) {
  return <>
    <section className="detail-features section-shell detail-features--split consulting-process" aria-label={l(content.hero.label)}>
      {content.items.map((item, index) => (
        <Reveal as="article" trigger="viewport" amount={0.2} delay={(index % 2) * motionTokens.stagger.tight} className="detail-feature" key={item.number}>
          <span className="item-code">{item.number}</span>
          <h2>{l(item.title)}</h2>
          <p>{l(item.description)}</p>
        </Reveal>
      ))}
    </section>

    <section className="consulting-support">
      <StaggerGroup trigger="viewport" className="section-shell consulting-support__inner">
        <Reveal><h2>{l(content.support.title)}</h2></Reveal>
        <Reveal><p>{l(content.support.description)}</p></Reveal>
      </StaggerGroup>
    </section>
  </>;
}

function ConsultingFinalCta({ content, l, openModal }: { content: Extract<ConsultingDetailContent, { layout: 'industries' | 'process' }>['cta']; l: Localizer; openModal: () => void }) {
  return (
    <section className="explore-band explore-band--cta consulting-final-cta">
      <StaggerGroup trigger="viewport" amount={0.2} className="explore-band__content">
        <Reveal><h2>{l(content.title)}</h2></Reveal>
        <Reveal><p>{l(content.description)}</p></Reveal>
        <Reveal><button className="pill-button" onClick={openModal}>{l(content.label)}</button></Reveal>
      </StaggerGroup>
    </section>
  );
}

export function ConsultingDetailPage({ content }: { content: ConsultingDetailContent }) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l: Localizer = (value) => localize(value, lang);

  return (
    <PageTransition>
      <article className={`marketing-page detail-page family-consulting consulting-detail consulting-detail--${content.layout}`}>
        <ConsultingHero hero={content.hero} split={content.layout === 'process'} l={l} />
        {content.layout === 'capabilities' && <ConsultingCapabilities content={content} l={l} openModal={openModal} />}
        {content.layout === 'industries' && <ConsultingIndustries content={content} l={l} />}
        {content.layout === 'process' && <ConsultingProcess content={content} l={l} />}
        {content.layout !== 'capabilities' && <ConsultingFinalCta content={content.cta} l={l} openModal={openModal} />}
      </article>
    </PageTransition>
  );
}
