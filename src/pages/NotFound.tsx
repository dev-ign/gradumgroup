import { Link } from 'react-router-dom';
import { PageTransition } from '../components/ui/PageTransition';
import { useTranslation } from '../i18n/useTranslation';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <article className="marketing-page not-found-page section-shell">
        <p className="eyebrow">404</p>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.description')}</p>
        <Link className="outline-button" to="/">{t('common.returnHome')}</Link>
      </article>
    </PageTransition>
  );
}
