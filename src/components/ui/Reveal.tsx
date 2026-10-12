import { motion, useReducedMotion, type MotionStyle } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  createRevealVariants,
  createStaggerVariants,
  motionTokens,
  reducedRevealVariants,
  type RevealVariant,
} from '../../motion/presets';

type MotionTag = 'div' | 'article' | 'section' | 'footer' | 'ul';
type RevealTrigger = 'inherit' | 'mount' | 'viewport';

interface SharedMotionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: MotionStyle;
  as?: MotionTag;
  'aria-hidden'?: boolean;
}

type RevealProps = SharedMotionProps & {
  variant?: RevealVariant | 'content';
  trigger?: RevealTrigger;
  delay?: number;
  amount?: number;
  once?: boolean;
};

type StaggerGroupProps = SharedMotionProps & {
  trigger?: RevealTrigger;
  delayChildren?: number;
  staggerChildren?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
};

const renderMotionElement = (
  as: MotionTag,
  props: {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: MotionStyle;
    'aria-hidden'?: boolean;
    variants: ReturnType<typeof createRevealVariants>;
    initial?: false | string;
    animate?: string;
    whileInView?: string;
    viewport?: { once: boolean; amount: number; margin: string };
  },
) => {
  if (as === 'article') return <motion.article {...props} />;
  if (as === 'section') return <motion.section {...props} />;
  if (as === 'footer') return <motion.footer {...props} />;
  if (as === 'ul') return <motion.ul {...props} />;
  return <motion.div {...props} />;
};

export const Reveal = ({
  as = 'div',
  variant = 'fadeUp',
  trigger = 'inherit',
  delay = 0,
  amount = motionTokens.viewport.amount,
  once = true,
  ...props
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const resolvedVariant = variant === 'content' ? 'fadeUp' : variant;
  const triggerProps = trigger === 'viewport'
    ? {
        initial: prefersReducedMotion ? false as const : 'hidden',
        whileInView: 'visible',
        viewport: { once, amount, margin: motionTokens.viewport.margin },
      }
    : trigger === 'mount'
      ? {
          initial: prefersReducedMotion ? false as const : 'hidden',
          animate: 'visible',
        }
      : {};

  return renderMotionElement(as, {
    ...props,
    variants: prefersReducedMotion
      ? reducedRevealVariants
      : createRevealVariants(resolvedVariant, delay),
    ...triggerProps,
  });
};

export const StaggerGroup = ({
  as = 'div',
  trigger = 'mount',
  delayChildren = motionTokens.groupDelay,
  staggerChildren,
  stagger,
  amount = motionTokens.viewport.amount,
  once = true,
  ...props
}: StaggerGroupProps) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = createStaggerVariants(
    prefersReducedMotion ? 0 : delayChildren,
    prefersReducedMotion
      ? 0
      : stagger ?? staggerChildren ?? motionTokens.stagger.standard,
  );
  const triggerProps = trigger === 'viewport'
    ? {
        initial: prefersReducedMotion ? false as const : 'hidden',
        whileInView: 'visible',
        viewport: { once, amount, margin: motionTokens.viewport.margin },
      }
    : trigger === 'mount'
      ? {
        initial: prefersReducedMotion ? false as const : 'hidden',
        animate: 'visible',
      }
      : {};

  return renderMotionElement(as, {
    ...props,
    variants,
    ...triggerProps,
  });
};
