import { PageTransition } from '../components/ui/PageTransition';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { localize, venturesContent } from '../data/siteContent';

export function Ventures() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  return (
    <PageTransition>
      <article className="marketing-page ventures-page">
        <section className="ventures-hero section-shell">
          <StaggerGroup><Reveal><p className="eyebrow">{l(venturesContent.eyebrow)}</p></Reveal><Reveal><h1>{l(venturesContent.title)}</h1></Reveal><Reveal><p>{l(venturesContent.description)}</p></Reveal></StaggerGroup>
          <Reveal trigger="mount" variant="image" delay={0.22}><img src="/assets/figma/ventures-hero.png" alt="Founders collaborating in a startup workspace" /></Reveal>
        </section>
        <StaggerGroup as="section" trigger="viewport" className="ventures-grid section-shell" stagger={0.06}>
          {venturesContent.items.map((item) => <Reveal as="article" variant="image" key={l(item.title)}><img src={item.image} alt="" /><h2>{l(item.title)}</h2><p>{l(item.description)}</p></Reveal>)}
        </StaggerGroup>
        <StaggerGroup as="section" trigger="viewport" className="ventures-closing"><Reveal><h2>{l(venturesContent.closing)}</h2></Reveal><Reveal><p>{l(venturesContent.closingBody)}</p></Reveal><Reveal><div className="ventures-closing__actions"><button className="pill-button" onClick={openModal}>{lang === 'es' ? 'Enviar una Consulta' : 'Submit an Inquiry'}</button><button className="outline-button outline-button--light" onClick={openModal}>{lang === 'es' ? 'Conversar sobre una oportunidad' : 'Discuss an Opportunity'}</button></div></Reveal></StaggerGroup>
      </article>
    </PageTransition>
  );
}
