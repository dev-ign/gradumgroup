import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactModal } from '../ui/ContactModal';
import { ScrollTrigger } from '../../lib/gsap';

export function Layout() {
  const location = useLocation();

  useLayoutEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    lenis.on('scroll', () => ScrollTrigger.update());

    const tick = (time: number) => lenis.raf(time * 1000);
    // use requestAnimationFrame directly so Lenis runs its own loop
    let rafId: number;
    function loop(t: number) {
      lenis.raf(t);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    void tick; // suppress unused warning — using RAF loop above instead
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
      <ContactModal />
    </div>
  );
}
