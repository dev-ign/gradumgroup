import type { Variants } from 'framer-motion';

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RevealVariant = 'fadeUp' | 'fadeIn' | 'image';

export const motionTokens = {
  duration: {
    fast: 0.25,
    standard: 0.54,
    slow: 0.64,
  },
  distance: {
    subtle: 16,
    image: 12,
  },
  stagger: {
    tight: 0.055,
    standard: 0.075,
    image: 0.14,
  },
  viewport: {
    amount: 0.15,
  },
  ease: premiumEase,
} as const;

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: motionTokens.distance.subtle,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.standard,
      ease: motionTokens.ease,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTokens.duration.standard,
      ease: motionTokens.ease,
    },
  },
};

export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: motionTokens.distance.image,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease,
    },
  },
};

export const reducedRevealVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const createRevealVariants = (
  variant: RevealVariant = 'fadeUp',
  delay = 0,
): Variants => {
  const source = variant === 'image'
    ? imageRevealVariants
    : variant === 'fadeIn'
      ? fadeInVariants
      : revealVariants;
  const visible = source.visible as Record<string, unknown>;
  const transition = (visible.transition ?? {}) as Record<string, unknown>;

  return {
    ...source,
    visible: {
      ...visible,
      transition: {
        ...transition,
        delay,
      },
    },
  };
};

export const createStaggerVariants = (
  delayChildren: number = 0,
  staggerChildren: number = motionTokens.stagger.standard,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});
