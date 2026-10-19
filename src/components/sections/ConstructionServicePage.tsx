import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { imageSizes } from '../../data/imageSizes';
import { localize } from '../../data/siteContent';
import type { ConstructionServiceContent } from '../../data/constructionServices';
import { motionTokens } from '../../motion/presets';
import { OptimizedImage } from '../ui/OptimizedImage';
import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';

export function ConstructionServicePage({ content }: { content: ConstructionServiceContent }) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);

  return (
    <PageTransition>
      <article className="marketing-page detail-page family-construction detail-page--split detail-page--construction-service">
        <section className="detail-hero section-shell detail-hero--split">
          <StaggerGroup className="detail-hero__copy">
            <Reveal className="hero-eyebrow-anchor"><div className="detail-hero__breadcrumb">
              <Link className="eyebrow platform-eyebrow" to="/construction">{l(content.hero.eyebrow)}</Link>
              <span aria-hidden="true">/</span>
              <span className="detail-hero__category">{l(content.hero.category)}</span>
            </div></Reveal>
            <Reveal><h1>{l(content.hero.title)}</h1></Reveal>
            <Reveal><p className="detail-hero__description">{l(content.hero.description)}</p></Reveal>
            <Reveal><button className="pill-button" onClick={openModal}>{l(content.cta.label)}</button></Reveal>
          </StaggerGroup>
          <Reveal trigger="mount" variant="image" delay={0.44} className="detail-hero__image-frame">
            <OptimizedImage className="detail-hero__image" src={content.hero.image} alt={l(content.hero.imageAlt)} sizes={imageSizes.splitHero} decoding="async" loading="eager" fetchPriority="high" />
          </Reveal>
        </section>

        <StaggerGroup as="section" trigger="inherit" aria-label={l(content.expertise.label)} className="detail-features section-shell detail-features--split">
          {content.expertise.items.map((item, index) => (
            <Reveal as="article" trigger="viewport" amount={0.2} delay={(index % 2) * motionTokens.stagger.tight} className="detail-feature" key={item.title.en}>
              <div className="detail-feature__copy">
                <h2>{l(item.title)}</h2>
                <p>{l(item.description)}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>

        <section className={`approach-band${content.support.label ? ' approach-band--labeled' : ''}`}>
          <StaggerGroup trigger="viewport" className="approach-band__inner">
            <StaggerGroup trigger="inherit">
              <Reveal><>
                {content.support.label && <p className="eyebrow">{l(content.support.label)}</p>}
                <h2>{l(content.support.title)}</h2>
              </></Reveal>
              <Reveal><p>{l(content.support.description)}</p></Reveal>
            </StaggerGroup>
          </StaggerGroup>
        </section>

        <section className="explore-band explore-band--cta">
          <StaggerGroup trigger="viewport" amount={0.2} className="explore-band__content">
            <Reveal><h2>{l(content.cta.title)}</h2></Reveal>
            <Reveal><p>{l(content.cta.description)}</p></Reveal>
            <Reveal><button className="pill-button" onClick={openModal}>{l(content.cta.label)}</button></Reveal>
          </StaggerGroup>
        </section>
      </article>
    </PageTransition>
  );
}
