import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * GSAP ScrollTrigger batch scroll reveal.
 * Elements with [data-reveal] fade in + slide up on enter,
 * fade out + slide down on exit. Stagger is position-based:
 * elements entering the viewport at the same scroll position
 * animate left-to-right in DOM order.
 */
export function useScrollReveal() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0, y: 28 });

      ScrollTrigger.batch('[data-reveal]', {
        interval: 0.08,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: true,
          }),
        onLeave: (els) =>
          gsap.to(els, {
            opacity: 0,
            y: -18,
            stagger: 0.04,
            duration: 0.35,
            overwrite: true,
          }),
        onEnterBack: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
          }),
        onLeaveBack: (els) =>
          gsap.to(els, {
            opacity: 0,
            y: 28,
            stagger: 0.04,
            duration: 0.35,
            overwrite: true,
          }),
        start: 'top 88%',
      });
    });

    return () => ctx.revert();
  }, []);
}
