import type { MotionProps } from "motion/react";

export const viewTransition: MotionProps = {
  initial: {
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.98,
    opacity: 0,
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.5,
  },
};
