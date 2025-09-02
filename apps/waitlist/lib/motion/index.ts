import type { MotionProps } from "motion/react";

export const viewTransition: MotionProps = {
  initial: {
    scale: 0.95,
    y: 12,
    opacity: 0,
    filter: "blur(4px)",
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    scale: 0.95,
    y: 12,
    opacity: 0,
    filter: "blur(4px)",
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.5,
  },
};
