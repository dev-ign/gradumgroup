import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { motionTokens } from '../../motion/presets';

const variants = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={variants}
      initial={reducedMotion ? false : 'initial'}
      animate="animate"
      exit="exit"
      transition={{
        duration: reducedMotion ? 0 : motionTokens.duration.fast,
        ease: motionTokens.ease,
      }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}
