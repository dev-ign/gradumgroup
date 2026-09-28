import { PageTransition } from '../components/ui/PageTransition';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { aboutContent, localize } from '../data/siteContent';

const heroImages = ['/assets/figma/about-hero-1.png', '/assets/figma/about-hero-2.png', '/assets/figma/about-hero-3.png', '/assets/figma/about-hero-4.png'];
const team = [
  ['Argenis De Los Santos', 'CEO & Founder', '/assets/figma/team-argenis.png'],
  ['Jona Ferreira', 'VP of Product', '/assets/figma/team-jona.png'],
  ['Laura Ramos', 'VP of Sales', '/assets/figma/team-laura.png'],
  ['Hector Soto', 'Financial Advisor', '/assets/figma/team-hector.png'],
];

export function About() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const [titleFirst, titleLast] = l(aboutContent.title).split(/ (?=[^ ]+[.]?$)/);

  return (
    <PageTransition>
      <article className="marketing-page about-page">
        <section className="about-hero section-shell">
          <StaggerGroup className="about-hero__intro"><Reveal><h1>{titleFirst} <span>{titleLast}</span></h1></Reveal><Reveal><p><strong>{l(aboutContent.introBold)}</strong>{l(aboutContent.intro)}</p></Reveal></StaggerGroup>
          <StaggerGroup className="about-collage" delayChildren={0.18} stagger={0.08}>{heroImages.map((image, index) => <Reveal variant="image" key={image}><img src={image} alt="" className={`about-image-${index + 1}`} /></Reveal>)}</StaggerGroup>
        </section>
        <section className="about-who section-shell">
          <Reveal trigger="viewport" className="section-heading"><h2>{l(aboutContent.whoTitle)}</h2><p>{l(aboutContent.whoBody)}</p></Reveal>
          <StaggerGroup trigger="viewport" className="team-grid" stagger={0.055}>{team.map(([name, role, image]) => <Reveal as="article" variant="image" key={name}><img src={image} alt={name} /><div><h3>{name}</h3><p>{role}</p></div></Reveal>)}</StaggerGroup>
        </section>
        <section className="about-approach section-shell">
          <Reveal trigger="viewport" className="section-heading"><h2>{l(aboutContent.approachTitle)}</h2><p>{l(aboutContent.approachBody)}</p></Reveal>
          <StaggerGroup trigger="viewport" className="principles" stagger={0.06}>{aboutContent.principles.map((item) => <Reveal as="article" key={item.code}><span>{item.code}</span><h3>{l(item.title)}</h3><p>{l(item.description)}</p></Reveal>)}</StaggerGroup>
        </section>
        <StaggerGroup as="section" trigger="viewport" className="about-panels section-shell">
          <Reveal as="article"><h2>{l(aboutContent.teamTitle)}</h2><p>{l(aboutContent.teamBody)}</p></Reveal>
          <Reveal as="article"><h2>{l(aboutContent.regionalTitle)}</h2><p>{l(aboutContent.regionalBody)}</p></Reveal>
        </StaggerGroup>
        <StaggerGroup as="section" trigger="viewport" className="about-final"><Reveal><a className="outline-button" href="#platform">{lang === 'es' ? 'Explorar nuestra plataforma' : 'Explore Our Platform'}</a></Reveal><Reveal><button className="pill-button" onClick={openModal}>{lang === 'es' ? 'Iniciar una Conversación' : 'Start a Conversation'}</button></Reveal></StaggerGroup>
      </article>
    </PageTransition>
  );
}
