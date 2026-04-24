import { useModal } from '../../context/ModalContext';
import { useTranslation } from '../../i18n/useTranslation';

export function Footer() {
  const { openModal } = useModal();
  const { t } = useTranslation();

  return (
    <footer
      className="border-t border-[var(--border-color)] mt-auto"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="text-xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-[#AEE37B] transition-colors duration-200">
                GRADUM
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[var(--text-secondary)] uppercase self-end pb-0.5">
                GROUP
              </span>
            </a>
          </div>

          <div>
            <button
              onClick={openModal}
              className="text-xs bg-[#AEE37B] hover:bg-[#c8f090] font-semibold px-4 py-2 border border-[var(--border-color)] text-[#0A2924] hover:border-[var(--accent-fg)] transition-all duration-200 tracking-wide rounded-full"
            >
              {t('common.requestConsultation')}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={openModal}
              className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
            >
              {t('common.requestConsultation')}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/gradumgroup/"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group Instagram"
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
              href="https://www.linkedin.com/company/gradumgroup"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group LinkedIn"
              className="text-[var(--text-secondary)] hover:opacity-80 transition-opacity duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/gradumgroup"
              target="_blank"
              rel="noreferrer"
              aria-label="Gradum Group Facebook"
              className="text-[var(--text-secondary)] hover:opacity-80 transition-opacity duration-200"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.972H15.83c-1.491 0-1.956.931-1.956 1.887v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
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
