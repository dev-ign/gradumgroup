import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';
import { OptimizedImage } from '../ui/OptimizedImage';
import { imageSizes } from '../../data/imageSizes';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { localize, type DetailPageContent } from '../../data/siteContent';

interface DetailPageProps {
  content: DetailPageContent;
}

export function DetailPage({ content }: DetailPageProps) {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const heroSplit = content.layout === 'split' || content.layout === 'cards';

  return (
    <PageTransition>
      <article className={`marketing-page detail-page family-${content.family} detail-page--${content.layout}`}>
        <section className={`detail-hero section-shell ${heroSplit ? 'detail-hero--split' : ''}`}>
          <StaggerGroup className="detail-hero__copy">
            <Reveal><p className="eyebrow platform-eyebrow">{l(content.eyebrow)}</p></Reveal>
            <Reveal><h1>{l(content.title)}</h1></Reveal>
            <Reveal><p className="detail-hero__description">{l(content.description)}</p></Reveal>
          </StaggerGroup>
          {content.image && <Reveal trigger="mount" variant="image" delay={0.22} className="detail-hero__image-frame"><OptimizedImage className="detail-hero__image" src={content.image} alt={content.imageAlt ? l(content.imageAlt) : ''} decoding="async" loading="eager" fetchPriority="high" /></Reveal>}
        </section>

        <StaggerGroup as="section" trigger="viewport" className={`detail-features section-shell detail-features--${content.layout}`}>
          {content.items.map((item) => (
            <Reveal as="article" className="detail-feature" key={`${item.code ?? ''}-${l(item.title)}`}>
              {item.image && <OptimizedImage src={item.image} alt="" sizes={imageSizes.card} loading="lazy" decoding="async" />}
              <div className="detail-feature__copy">
                <h2>{l(item.title)}</h2>
                <p>{l(item.description)}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>

        {content.statement && (
          <section className={`approach-band ${content.statementImage ? 'approach-band--image' : ''}`}>
            {content.statementImage && content.layout !== 'split' && <OptimizedImage className="approach-band__background" src={content.statementImage} alt="" sizes={imageSizes.band} loading="lazy" decoding="async" />}
            <StaggerGroup trigger="viewport" className="approach-band__inner">
              {content.statementImage && content.family === 'services' && content.layout === 'split' && <Reveal variant="image" className="approach-band__visual"><OptimizedImage src={content.statementImage} alt="" loading="lazy" decoding="async" /></Reveal>}
              <StaggerGroup trigger="inherit">
                {content.statementEyebrow && <Reveal><p className="eyebrow">{l(content.statementEyebrow)}</p></Reveal>}
                <Reveal><h2>{l(content.statement)}</h2></Reveal>
                {content.family === 'consulting' && <Reveal><p>{lang === 'es' ? 'Seleccionamos métodos y plataformas según los requisitos técnicos, las necesidades de integración y la mantenibilidad a largo plazo.' : 'We select methods and platforms based on technical requirements, integration needs and long-term maintainability.'}</p></Reveal>}
                <Reveal><button className="pill-button" onClick={openModal}>{l(content.cta)}</button></Reveal>
              </StaggerGroup>
            </StaggerGroup>
          </section>
        )}

        {!content.statement && (
          <Reveal as="section" trigger="viewport" className="simple-cta"><button className="pill-button" onClick={openModal}>{l(content.cta)}</button></Reveal>
        )}
      </article>
    </PageTransition>
  );
}
