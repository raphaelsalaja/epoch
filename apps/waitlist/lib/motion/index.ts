import type { MotionProps } from "motion/react";

export const viewTransition: MotionProps = {
  initial: {
    y: 24,
    opacity: 0,
    filter: "blur(4px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: 24,
    opacity: 0,
    filter: "blur(4px)",
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.5,
  },
};
