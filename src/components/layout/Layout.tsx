import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactModal } from '../ui/ContactModal';

export function Layout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const initialLocation = useRef(true);

  useLayoutEffect(() => {
    if (initialLocation.current) {
      initialLocation.current = false;
      return;
    }
    if (navigationType !== 'POP') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.key, navigationType]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
        <Footer />
        <ContactModal />
      </div>
    </MotionConfig>
  );
}
