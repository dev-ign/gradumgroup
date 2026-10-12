import { Link } from 'react-router-dom';
import { PageTransition } from '../components/ui/PageTransition';
import { Reveal, StaggerGroup } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { aboutContent, localize } from '../data/siteContent';
import { useTranslation } from '../i18n/useTranslation';

export function About() {
  const { lang } = useLanguage();
  const { openModal } = useModal();
  const { t } = useTranslation();
  const l = (value: Parameters<typeof localize>[0]) => localize(value, lang);
  const [titleFirst, titleLast] = l(aboutContent.title).split(/ (?=[^ ]+[.]?$)/);

  return (
    <PageTransition>
      <article className="marketing-page about-page">
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero__decoration" aria-hidden="true">
            <img src="/assets/figma/about-hero-arrow.svg" alt="" width="1073" height="1073" />
          </div>
          <StaggerGroup className="about-hero__intro section-shell">
            <Reveal>
              <h1 id="about-title"><span>{titleFirst}</span>{' '}<span>{titleLast}</span></h1>
            </Reveal>
            <Reveal>
              <p><strong>{l(aboutContent.introBold)}</strong>{l(aboutContent.intro)}</p>
            </Reveal>
          </StaggerGroup>
        </section>

        <section className="about-who section-shell" aria-labelledby="about-who-title">
          <StaggerGroup trigger="viewport" className="about-section-heading">
            <Reveal><h2 id="about-who-title">{l(aboutContent.whoTitle)}</h2></Reveal>
            <Reveal><p>{l(aboutContent.whoBody)}</p></Reveal>
          </StaggerGroup>
        </section>

        <section className="about-approach section-shell" aria-labelledby="about-approach-title">
          <StaggerGroup trigger="viewport" className="about-section-heading">
            <Reveal><h2 id="about-approach-title">{l(aboutContent.approachTitle)}</h2></Reveal>
            <Reveal><p>{l(aboutContent.approachBody)}</p></Reveal>
          </StaggerGroup>
          <StaggerGroup trigger="viewport" className="about-principles">
            {aboutContent.principles.map((item) => (
              <Reveal as="article" key={item.code}>
                <h3>{l(item.title)}</h3>
                <p>{l(item.description)}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </section>

        <StaggerGroup as="section" trigger="viewport" className="about-panels section-shell">
          <Reveal as="article" className="about-panel about-panel--team">
            <div className="about-panel__copy">
              <h2>{l(aboutContent.teamTitle)}</h2>
              <p>{l(aboutContent.teamBody)}</p>
            </div>
          </Reveal>
          <Reveal as="article" className="about-panel about-panel--regional">
            <div className="about-panel__copy">
              <h2>{l(aboutContent.regionalTitle)}</h2>
              <p>{l(aboutContent.regionalBody)}</p>
            </div>
          </Reveal>
        </StaggerGroup>

        <StaggerGroup as="section" trigger="viewport" className="about-final">
          <Reveal><Link className="outline-button" to="/">{t('about.explorePlatform')}</Link></Reveal>
          <Reveal><Button variant="primary" onClick={openModal}>{t('nav.startConversation')}</Button></Reveal>
        </StaggerGroup>
      </article>
    </PageTransition>
  );
}
