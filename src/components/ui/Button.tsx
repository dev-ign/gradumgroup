import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE37B] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#AEE37B] text-[#0A2924] hover:bg-[#9dd468] active:scale-[0.98]',
    outline: 'border border-[#AEE37B] text-[#AEE37B] hover:bg-[#AEE37B] hover:text-[#0A2924] active:scale-[0.98]',
    ghost: 'text-[var(--text-primary)] hover:text-[#AEE37B] active:scale-[0.98]',
    pill: 'rounded-full border border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] active:scale-[0.98]',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 rounded',
    md: 'text-sm px-6 py-3 rounded-sm',
    lg: 'text-sm px-7 py-3 rounded-sm',
  };

  // pill variant always uses rounded-full regardless of size
  const sizeClass = variant === 'pill'
    ? sizes[size].replace('rounded-sm', '').replace('rounded', '')
    : sizes[size];

  return (
    <button
      className={`${base} ${variants[variant]} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
