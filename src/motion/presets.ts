import type { Variants } from 'framer-motion';

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RevealVariant = 'fadeUp' | 'fadeIn' | 'image';

export const motionTokens = {
  duration: {
    fast: 0.25,
    standard: 0.55,
    slow: 0.6,
  },
  distance: {
    subtle: 20,
    image: 12,
  },
  stagger: {
    tight: 0.08,
    standard: 0.1,
    image: 0.14,
  },
  viewport: {
    amount: 0.08,
    margin: '0px',
  },
  groupDelay: 0.04,
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
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease,
    },
  },
};

export const reducedRevealVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
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
  if (delay === 0) return source;

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
  delayChildren: number = motionTokens.groupDelay,
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
