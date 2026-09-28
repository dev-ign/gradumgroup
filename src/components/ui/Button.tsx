import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'pill-button',
    outline: 'outline-button',
    ghost: 'ghost-button',
    pill: 'outline-button',
  };
  const sizes = { sm: 'button--sm', md: '', lg: 'button--lg' };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
