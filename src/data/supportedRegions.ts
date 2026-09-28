export interface SupportedRegion {
  name: string;
  code: string;
  flagSrc?: string;
  flagEmoji: string;
}

export const supportedRegions: SupportedRegion[] = [
  {
    name: 'United States',
    code: 'US',
    flagSrc: '/assets/figma/flag-united-states.png',
    flagEmoji: '🇺🇸',
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    flagSrc: '/assets/figma/flag-dominican-republic.png',
    flagEmoji: '🇩🇴',
  },
  {
    name: 'Colombia',
    code: 'CO',
    flagSrc: '/assets/figma/flag-colombia.png',
    flagEmoji: '🇨🇴',
  },
  {
    name: 'Venezuela',
    code: 'VE',
    flagSrc: '/assets/figma/flag-venezuela.png',
    flagEmoji: '🇻🇪',
  },
  {
    name: 'Mexico',
    code: 'MX',
    flagSrc: '/assets/figma/flag-mexico.png',
    flagEmoji: '🇲🇽',
  },
  { name: 'Brazil', code: 'BR', flagEmoji: '🇧🇷' },
  { name: 'Argentina', code: 'AR', flagEmoji: '🇦🇷' },
  { name: 'Chile', code: 'CL', flagEmoji: '🇨🇱' },
  { name: 'Peru', code: 'PE', flagEmoji: '🇵🇪' },
  { name: 'Ecuador', code: 'EC', flagEmoji: '🇪🇨' },
  { name: 'Bolivia', code: 'BO', flagEmoji: '🇧🇴' },
  { name: 'Paraguay', code: 'PY', flagEmoji: '🇵🇾' },
  { name: 'Uruguay', code: 'UY', flagEmoji: '🇺🇾' },
  { name: 'Guatemala', code: 'GT', flagEmoji: '🇬🇹' },
  { name: 'El Salvador', code: 'SV', flagEmoji: '🇸🇻' },
  { name: 'Honduras', code: 'HN', flagEmoji: '🇭🇳' },
  { name: 'Nicaragua', code: 'NI', flagEmoji: '🇳🇮' },
  { name: 'Costa Rica', code: 'CR', flagEmoji: '🇨🇷' },
  { name: 'Panama', code: 'PA', flagEmoji: '🇵🇦' },
  { name: 'Cuba', code: 'CU', flagEmoji: '🇨🇺' },
  { name: 'Puerto Rico', code: 'PR', flagEmoji: '🇵🇷' },
  { name: 'Haiti', code: 'HT', flagEmoji: '🇭🇹' },
  { name: 'Belize', code: 'BZ', flagEmoji: '🇧🇿' },
];
