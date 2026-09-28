import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  supportedRegions,
  type SupportedRegion,
} from '../../data/supportedRegions';

const Flag = ({
  region,
  duplicate,
  countryName,
}: {
  region: SupportedRegion;
  duplicate: boolean;
  countryName: string;
}) => {
  if (region.flagSrc) {
    return (
      <img
        src={region.flagSrc}
        alt={duplicate ? '' : countryName}
        width="60"
        height="60"
        loading="eager"
      />
    );
  }

  return (
    <span
      className="regional-marquee__emoji"
      role={duplicate ? undefined : 'img'}
      aria-label={duplicate ? undefined : countryName}
    >
      {region.flagEmoji}
    </span>
  );
};

export const RegionalFlagCarousel = ({ lang = 'en' }: { lang?: 'en' | 'es' }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isDocumentHidden, setIsDocumentHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  );
  const regionNames = useMemo(
    () => new Intl.DisplayNames([lang], { type: 'region' }),
    [lang],
  );

  useEffect(() => {
    const handleVisibilityChange = () => setIsDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const renderSequence = (duplicate = false) => (
    <ul
      className="regional-marquee__sequence"
      aria-hidden={duplicate || undefined}
    >
      {supportedRegions.map((region) => {
        const countryName = regionNames.of(region.code) ?? region.name;

        return (
          <li className="regional-marquee__slide" key={`${duplicate ? 'duplicate' : 'region'}-${region.code}`}>
            <span className="regional-support__flag" title={countryName}>
              <Flag
                region={region}
                duplicate={duplicate}
                countryName={countryName}
              />
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`regional-marquee${isDocumentHidden ? ' is-paused' : ''}${prefersReducedMotion ? ' regional-marquee--static' : ''}`}
      role="region"
      aria-label={lang === 'es' ? 'Regiones donde ofrecemos apoyo' : 'Supported regions'}
      tabIndex={0}
    >
      {prefersReducedMotion ? (
        renderSequence()
      ) : (
        <div className="regional-marquee__track">
          {renderSequence()}
          {renderSequence(true)}
        </div>
      )}
    </div>
  );
};
