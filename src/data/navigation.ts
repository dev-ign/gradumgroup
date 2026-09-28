export interface NavigationItem {
  label: string;
  href: string;
}

export interface PlatformNavigationGroup extends NavigationItem {
  accent: 'consulting' | 'construction' | 'services';
  children: NavigationItem[];
}

interface RouteMatchOptions {
  exact?: boolean;
}

const normalizePath = (path: string) => path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;

export function isRouteActive(currentPath: string, targetPath: string, options: RouteMatchOptions = {}): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(targetPath);
  return options.exact ? current === target : current === target || current.startsWith(`${target}/`);
}

export function getActivePlatformGroupIndex(currentPath: string): number {
  return platformNavigation.findIndex((group) => isRouteActive(currentPath, group.href));
}

export const platformNavigation: PlatformNavigationGroup[] = [
  {
    label: 'Consulting',
    href: '/consulting',
    accent: 'consulting',
    children: [
      { label: 'Overview', href: '/consulting' },
      { label: 'Capabilities', href: '/consulting/capabilities' },
      { label: 'Industries', href: '/consulting/industries' },
      { label: 'How We Work', href: '/consulting/how-we-work' },
    ],
  },
  {
    label: 'Construction',
    href: '/construction',
    accent: 'construction',
    children: [
      { label: 'Overview', href: '/construction' },
      { label: 'Architecture', href: '/construction/architecture' },
      { label: 'Engineering', href: '/construction/engineering' },
      { label: 'Build', href: '/construction/build' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    accent: 'services',
    children: [
      { label: 'Overview', href: '/services' },
      { label: 'Accounting & Finance', href: '/services/accounting-finance' },
      { label: 'Marketing & Media', href: '/services/marketing-media' },
      { label: 'Admin & Legal', href: '/services/admin-legal' },
    ],
  },
];

export const primaryNavigation: NavigationItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Insights', href: '/insights' },
];
