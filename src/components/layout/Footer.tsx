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
