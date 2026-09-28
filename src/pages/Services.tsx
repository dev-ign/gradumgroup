import { PlatformLandingPage } from '../components/sections/PlatformLandingPage';
import { platformLandings } from '../data/siteContent';
export function Services() { return <PlatformLandingPage content={platformLandings.services} />; }
