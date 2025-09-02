import type { MotionProps } from "motion/react";

export const viewTransition: MotionProps = {
  initial: {
    x: -32,
    opacity: 0,
    filter: "blur(4px)",
  },
  animate: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    x: 32,
    opacity: 0,
    filter: "blur(4px)",
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.5,
  },
};
