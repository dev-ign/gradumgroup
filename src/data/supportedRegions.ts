export interface SupportedRegion {
  name: string;
  code: string;
  flagSrc: string;
}

// Keep this order in sync with the existing regional carousel. Each source is
// a bundled 1:1 SVG, so rendering never depends on OS emoji font support.
export const supportedRegions: SupportedRegion[] = [
  { name: 'United States', code: 'US', flagSrc: '/assets/flags/us.svg' },
  { name: 'Dominican Republic', code: 'DO', flagSrc: '/assets/flags/do.svg' },
  { name: 'Colombia', code: 'CO', flagSrc: '/assets/flags/co.svg' },
  { name: 'Venezuela', code: 'VE', flagSrc: '/assets/flags/ve.svg' },
  { name: 'Mexico', code: 'MX', flagSrc: '/assets/flags/mx.svg' },
  { name: 'Brazil', code: 'BR', flagSrc: '/assets/flags/br.svg' },
  { name: 'Argentina', code: 'AR', flagSrc: '/assets/flags/ar.svg' },
  { name: 'Chile', code: 'CL', flagSrc: '/assets/flags/cl.svg' },
  { name: 'Peru', code: 'PE', flagSrc: '/assets/flags/pe.svg' },
  { name: 'Ecuador', code: 'EC', flagSrc: '/assets/flags/ec.svg' },
  { name: 'Bolivia', code: 'BO', flagSrc: '/assets/flags/bo.svg' },
  { name: 'Paraguay', code: 'PY', flagSrc: '/assets/flags/py.svg' },
  { name: 'Uruguay', code: 'UY', flagSrc: '/assets/flags/uy.svg' },
  { name: 'Guatemala', code: 'GT', flagSrc: '/assets/flags/gt.svg' },
  { name: 'El Salvador', code: 'SV', flagSrc: '/assets/flags/sv.svg' },
  { name: 'Honduras', code: 'HN', flagSrc: '/assets/flags/hn.svg' },
  { name: 'Nicaragua', code: 'NI', flagSrc: '/assets/flags/ni.svg' },
  { name: 'Costa Rica', code: 'CR', flagSrc: '/assets/flags/cr.svg' },
  { name: 'Panama', code: 'PA', flagSrc: '/assets/flags/pa.svg' },
  { name: 'Cuba', code: 'CU', flagSrc: '/assets/flags/cu.svg' },
  { name: 'Puerto Rico', code: 'PR', flagSrc: '/assets/flags/pr.svg' },
  { name: 'Haiti', code: 'HT', flagSrc: '/assets/flags/ht.svg' },
  { name: 'Belize', code: 'BZ', flagSrc: '/assets/flags/bz.svg' },
];
