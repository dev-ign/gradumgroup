import Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function scrollToSection(id: string): void {
  if (instance) {
    instance.scrollTo(id, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
