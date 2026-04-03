import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../i18n/useTranslation';

export function Footer() {
  const { openModal } = useModal();
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <footer
      className="border-t border-[var(--border-color)] mt-auto"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="text-xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[#AEE37B] transition-colors duration-200">
                GRADUM
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[var(--text-secondary)] uppercase self-end pb-0.5">
                GROUP
              </span>
            </Link>
            {/* <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">
              {t('common.footerTagline')}
            </p> */}
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)] mb-4">{t('common.platform')}</h3>
            <ul className="space-y-2">
              {[
                { labelKey: 'common.consulting', to: '/consulting' },
                { labelKey: 'common.construction', to: '/construction' },
                { labelKey: 'common.services', to: '/services' },
                { labelKey: 'common.accelerator', to: '/accelerator' },
              ].map(item => (
                <li key={item.labelKey}>
                  <Link
                    to={item.to}
                    className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)] mb-4">{t('common.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <button
                  onClick={openModal}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  {t('common.contact')}
                </button>
              </li>
              <li>
                <button
                  onClick={openModal}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  {t('common.clientAccess')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={openModal}
              className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
            >
              {t('common.clientAccess')}
            </button>
            <span className="text-[var(--border-color)]">|</span>
            <Link to="#" className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
              {t('common.privacyPolicy')}
            </Link>
            <span className="text-[var(--border-color)]">|</span>
            <Link to="#" className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
              {t('common.terms')}
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Language */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span>🌎</span>
              <button
                onClick={() => setLang('en')}
                aria-label="English"
                className={`transition-colors duration-200 ${lang === 'en' ? 'text-[#AEE37B]' : 'hover:text-[#AEE37B]'}`}
              >
                EN
              </button>
              <span>|</span>
              <button
                onClick={() => setLang('es')}
                aria-label="Español"
                className={`transition-colors duration-200 ${lang === 'es' ? 'text-[#AEE37B]' : 'hover:text-[#AEE37B]'}`}
              >
                ES
              </button>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-[var(--text-secondary)] hover:opacity-80 transition-opacity duration-200"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
                  <defs>
                    <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F58529" />
                      <stop offset="50%" stopColor="#DD2A7B" />
                      <stop offset="100%" stopColor="#8134AF" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-gradient)" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="4" stroke="url(#ig-gradient)" strokeWidth="2" fill="none" />
                  <circle cx="18" cy="6" r="1.25" fill="url(#ig-gradient)" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-[var(--text-secondary)] hover:opacity-80 transition-opacity duration-200"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[var(--text-secondary)] hover:opacity-80 transition-opacity duration-200"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[11px] text-[var(--text-secondary)]">
            {t('common.footerLegal')}
          </p>
        </div>
      </div>
    </footer>
  );
}
