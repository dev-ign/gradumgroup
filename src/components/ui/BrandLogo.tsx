import { Link } from 'react-router-dom';

interface BrandLogoProps {
  inverse?: boolean;
  className?: string;
}

export function BrandLogo({ inverse = false, className = '' }: BrandLogoProps) {
  return (
    <Link to="/" className={`brand-logo ${inverse ? 'brand-logo--inverse' : ''} ${className}`} aria-label="Gradum Group home">
      <img className="brand-logo__mark" src="/assets/figma/gradum-mark.svg" alt="" width="42" height="44" />
      <img className="brand-logo__wordmark" src="/assets/figma/gradum-wordmark.svg" alt="Gradum Group" width="69" height="36" />
    </Link>
  );
}
