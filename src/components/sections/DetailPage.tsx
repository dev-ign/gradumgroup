import { PageTransition } from '../ui/PageTransition';
import { Reveal, StaggerGroup } from '../ui/Reveal';
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
          {content.image && <Reveal trigger="mount" variant="image" delay={0.22} className="detail-hero__image-frame"><img className="detail-hero__image" src={content.image} alt={content.imageAlt ? l(content.imageAlt) : ''} /></Reveal>}
        </section>

        <StaggerGroup as="section" trigger="viewport" className={`detail-features section-shell detail-features--${content.layout}`} stagger={0.06}>
          {content.items.map((item) => (
            <Reveal as="article" className="detail-feature" key={`${item.code ?? ''}-${l(item.title)}`}>
              {item.image && <img src={item.image} alt="" />}
              <div className="detail-feature__copy">
                <h2>{l(item.title)}</h2>
                <p>{l(item.description)}</p>
              </div>
            </Reveal>
          ))}
        </StaggerGroup>

        {content.statement && (
          <section className={`approach-band ${content.statementImage ? 'approach-band--image' : ''}`}>
            {content.statementImage && content.layout !== 'split' && <img className="approach-band__background" src={content.statementImage} alt="" />}
            <StaggerGroup trigger="viewport" className="approach-band__inner">
              {content.statementImage && content.family === 'services' && content.layout === 'split' && <Reveal variant="image" className="approach-band__visual"><img src={content.statementImage} alt="" /></Reveal>}
              <Reveal>
                {content.statementEyebrow && <p className="eyebrow">{l(content.statementEyebrow)}</p>}
                <h2>{l(content.statement)}</h2>
                {content.family === 'consulting' && <p>{lang === 'es' ? 'Seleccionamos métodos y plataformas según los requisitos técnicos, las necesidades de integración y la mantenibilidad a largo plazo.' : 'We select methods and platforms based on technical requirements, integration needs and long-term maintainability.'}</p>}
                <button className="pill-button" onClick={openModal}>{l(content.cta)}</button>
              </Reveal>
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
