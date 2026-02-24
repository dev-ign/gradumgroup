import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

export function Footer() {
  const { openModal } = useModal();

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
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Engineering-led advisory and execution platform structured for performance-critical environments.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)] mb-4">Platform</h3>
            <ul className="space-y-2">
              {[
                { label: 'Consulting', to: '/consulting' },
                { label: 'Construction', to: '/construction' },
                { label: 'Services', to: '/services' },
                { label: 'Accelerator', to: '/accelerator' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--text-secondary)] mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={openModal}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={openModal}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  Client Access
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
              Client Access
            </button>
            <span className="text-[var(--border-color)]">|</span>
            <Link to="#" className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-[var(--border-color)]">|</span>
            <Link to="#" className="text-xs text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Language */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span>🌎</span>
              <button className="hover:text-[#AEE37B] transition-colors duration-200">ES</button>
              <span>|</span>
              <button className="text-[#AEE37B]">EN</button>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', abbr: 'IG', href: '#' },
                { label: 'Facebook', abbr: 'FB', href: '#' },
                { label: 'LinkedIn', abbr: 'IN', href: '#' },
              ].map(s => (
                <a
                  key={s.abbr}
                  href={s.href}
                  aria-label={s.label}
                  className="text-xs font-bold text-[var(--text-secondary)] hover:text-[#AEE37B] transition-colors duration-200"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[11px] text-[var(--text-secondary)]">
            Gradum Group LLC (US) &nbsp;|&nbsp; Gradum Group, SRL (Dominican Republic)
          </p>
        </div>
      </div>
    </footer>
  );
}
