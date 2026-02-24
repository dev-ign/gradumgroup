import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-10 h-5 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B]"
      style={{ backgroundColor: theme === 'dark' ? '#AEE37B' : 'var(--border-color)' }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 flex items-center justify-center text-[8px]"
        style={{
          backgroundColor: theme === 'dark' ? '#0A2924' : '#ffffff',
          transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      >
        {theme === 'dark' ? '◑' : '○'}
      </span>
    </button>
  );
}
