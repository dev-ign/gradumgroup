import { PageTransition } from '../components/ui/PageTransition';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { useLanguage } from '../context/LanguageContext';
import { insightsContent, localize } from '../data/siteContent';

const articleImages = ['/assets/figma/insights-article-1.png', '/assets/figma/insights-article-2.png', '/assets/figma/insights-article-3.png'];

export function Insights() {
  const { lang } = useLanguage();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const categories = lang === 'es' ? ['Todos', 'Consultoría', 'Construcción', 'Finanzas y Negocios', 'Marketing y Medios', 'Ventures'] : ['All', 'Consulting', 'Construction', 'Finance & Business', 'Marketing & Media', 'Ventures'];
  return (
    <PageTransition>
      <article className="marketing-page insights-page">
        <section className="insights-hero section-shell">
          <StaggerGroup><Reveal><p className="eyebrow">{l(insightsContent.eyebrow)}</p></Reveal><Reveal><h1>{l(insightsContent.title)}</h1></Reveal><Reveal><p>{l(insightsContent.description)}</p></Reveal></StaggerGroup>
          <Reveal trigger="mount" variant="image" delay={0.22}><img src="/assets/figma/insights-hero.png" alt="Business and engineering team in a working session" /></Reveal>
        </section>
        <section className="insights-content section-shell">
          <Reveal trigger="viewport"><div className="filter-pills">{categories.map((category, index) => <button className={index === 0 ? 'active' : ''} key={category}>{category}</button>)}</div></Reveal>
          <StaggerGroup trigger="viewport" className="article-grid" stagger={0.06}>{articleImages.map((image, index) => <Reveal as="article" variant="image" key={image}><img src={image} alt="" /><span>{categories[index + 1]} · {lang === 'es' ? 'FECHA' : 'DATE'}</span><h2>{l(insightsContent.articleTitle)}</h2><p>{l(insightsContent.articleSummary)}</p><a href="#article">{lang === 'es' ? 'Leer perspectiva' : 'Read Insight'} →</a></Reveal>)}</StaggerGroup>
        </section>
        <StaggerGroup as="section" trigger="viewport" className="editorial-principle"><Reveal><p className="eyebrow">{lang === 'es' ? 'PRINCIPIO EDITORIAL' : 'EDITORIAL PRINCIPLE'}</p></Reveal><Reveal><h2>{l(insightsContent.principle)}</h2></Reveal><Reveal><p>{l(insightsContent.principleBody)}</p></Reveal><Reveal><button className="outline-button">{lang === 'es' ? 'Explorar todas las perspectivas' : 'Explore All Insights'}</button></Reveal></StaggerGroup>
      </article>
    </PageTransition>
  );
}
