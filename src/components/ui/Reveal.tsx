import { motion, useReducedMotion, type MotionStyle } from 'framer-motion';
import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  createRevealVariants,
  createStaggerVariants,
  motionTokens,
  reducedRevealVariants,
  type RevealVariant,
} from '../../motion/presets';

type MotionTag = 'div' | 'article' | 'section' | 'footer' | 'ul';
type RevealTrigger = 'inherit' | 'mount' | 'viewport';

// Motion's accelerated opacity can briefly expose the hidden base style as it
// finishes. A value subscriber keeps these short entrance tweens on its JS
// renderer, which commits the final opacity in the same frame.
const keepRevealOnMainThread = () => {};

// A responsive switch can change which element owns the viewport trigger.
// Once that happens, keep the mounted content visible instead of rearming it.
const useTriggerChanged = (trigger: RevealTrigger) => {
  const [history, setHistory] = useState({ trigger, changed: false });
  if (history.trigger !== trigger) {
    setHistory({ trigger, changed: true });
  }
  return history.changed || history.trigger !== trigger;
};

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
};

type StaggerGroupProps = SharedMotionProps & {
  trigger?: RevealTrigger;
  delayChildren?: number;
  staggerChildren?: number;
  stagger?: number;
  amount?: number;
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
    onViewportEnter?: () => void;
    onUpdate?: () => void;
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
  ...props
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const triggerChanged = useTriggerChanged(trigger);
  const [hasEntered, setHasEntered] = useState(false);
  const markEntered = useCallback(() => setHasEntered(true), []);
  const resolvedVariant = variant === 'content' ? 'fadeUp' : variant;
  const observeViewport = !prefersReducedMotion && !triggerChanged && typeof IntersectionObserver !== 'undefined';
  const variants = useMemo(
    () => prefersReducedMotion || triggerChanged ? reducedRevealVariants : createRevealVariants(resolvedVariant, delay),
    [prefersReducedMotion, triggerChanged, resolvedVariant, delay],
  );
  const triggerProps = trigger === 'viewport'
    ? {
        initial: observeViewport ? 'hidden' : false as const,
        animate: observeViewport && !hasEntered ? 'hidden' : 'visible',
        ...(observeViewport ? {
          onViewportEnter: markEntered,
          viewport: { once: true, amount, margin: motionTokens.viewport.margin },
        } : {}),
      }
    : trigger === 'mount'
      ? {
          initial: prefersReducedMotion || triggerChanged ? false as const : 'hidden',
          animate: 'visible',
        }
      : triggerChanged ? { initial: false as const, animate: 'visible' } : {};

  return renderMotionElement(as, {
    ...props,
    variants,
    onUpdate: keepRevealOnMainThread,
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
  ...props
}: StaggerGroupProps) => {
  const prefersReducedMotion = useReducedMotion();
  const triggerChanged = useTriggerChanged(trigger);
  const [hasEntered, setHasEntered] = useState(false);
  const markEntered = useCallback(() => setHasEntered(true), []);
  const observeViewport = !prefersReducedMotion && !triggerChanged && typeof IntersectionObserver !== 'undefined';
  const variants = useMemo(() => createStaggerVariants(
    prefersReducedMotion || triggerChanged ? 0 : delayChildren,
    prefersReducedMotion || triggerChanged ? 0 : stagger ?? staggerChildren ?? motionTokens.stagger.standard,
  ), [prefersReducedMotion, triggerChanged, delayChildren, stagger, staggerChildren]);
  const triggerProps = trigger === 'viewport'
    ? {
        initial: observeViewport ? 'hidden' : false as const,
        animate: observeViewport && !hasEntered ? 'hidden' : 'visible',
        ...(observeViewport ? {
          onViewportEnter: markEntered,
          viewport: { once: true, amount, margin: motionTokens.viewport.margin },
        } : {}),
      }
    : trigger === 'mount'
      ? {
        initial: prefersReducedMotion || triggerChanged ? false as const : 'hidden',
        animate: 'visible',
      }
      : triggerChanged ? { initial: false as const, animate: 'visible' } : {};

  return renderMotionElement(as, {
    ...props,
    variants,
    ...triggerProps,
  });
};
