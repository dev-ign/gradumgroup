import { Link } from 'react-router-dom';
import { platformNavigation } from '../../data/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../i18n/useTranslation';
import { Reveal, StaggerGroup } from '../ui/Reveal';

const labelKeys: Record<string, string> = {
  Consulting: 'nav.consulting', Construction: 'nav.construction', Services: 'nav.services', Capabilities: 'nav.capabilities',
  Industries: 'nav.industries', 'How We Work': 'nav.howWeWork', Architecture: 'nav.architecture', Engineering: 'nav.engineering',
  Build: 'nav.build', 'Accounting & Finance': 'nav.accountingFinance', 'Marketing & Media': 'nav.marketingMedia', 'Admin & Legal': 'nav.adminLegal',
};

export function Footer() {
  const { t } = useTranslation();
  const { lang, setLang } = useLanguage();
  const label = (value: string) => labelKeys[value] ? t(labelKeys[value]) : value;

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Reveal trigger="viewport" className="site-footer__brand">
          <div><span />Gradum Group</div>
          <p>{t('common.footerFigmaTagline')}</p>
        </Reveal>
        <StaggerGroup trigger="viewport" className="site-footer__columns" stagger={0.06}>
          {platformNavigation.map((group) => (
            <Reveal key={group.href}>
              <Link className="site-footer__heading" to={group.href}>{label(group.label)}</Link>
              {group.children.slice(1).map((item) => <Link key={item.href} to={item.href}>{label(item.label)}</Link>)}
            </Reveal>
          ))}
          <Reveal>
            <span className="site-footer__heading">{t('nav.company')}</span>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/ventures">{t('nav.ventures')}</Link>
            <Link to="/insights">{t('nav.insights')}</Link>
            <a href="#client-portal">{t('nav.clientPortal')}</a>
          </Reveal>
        </StaggerGroup>
      </div>
      <Reveal trigger="viewport" className="site-footer__bottom">
        <p>© 2026 Gradum Group. {t('common.allRightsReserved')}</p>
        <div className="footer-language" aria-label={t('nav.selectLanguage')}>
          <button className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button><span aria-hidden="true">·</span>
          <button className={lang === 'es' ? 'active' : ''} aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
        </div>
        <p>{t('common.footerRegions')}</p>
      </Reveal>
    </footer>
  );
}
