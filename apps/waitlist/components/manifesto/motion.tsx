import { type MotionProps, stagger } from "motion/react";

export const container: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.1, { ease: "easeOut" }),
      },
    },
  },
  initial: "hidden",
  animate: "show",
};

export const item: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      y: 8,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  },
};

export const reveal: MotionProps = {
  initial: {
    y: 8,
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: {
    y: 8,
    scale: 0.98,
    opacity: 0,
  },
  transition: {
    default: {
      type: "spring",
      duration: 0.4,
      bounce: 0.7,
    },
    opacity: {
      type: "spring",
      duration: 0.2,
      bounce: 0,
    },
  },
};

export function spinner(state: boolean): MotionProps {
  return {
    initial: false,
    layout: "position",
    animate: {
      opacity: state ? 1 : 0,
      scale: state ? 1 : 0,
    },
    style: {
      width: state ? "auto" : 0,
      marginRight: state ? 8 : 0,
    },
    transition: {
      scale: {
        duration: 0.5,
        type: "spring",
        bounce: 0.3,
      },
      default: {
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      },
    },
  };
}

export function text(state: boolean): MotionProps {
  return {
    initial: false,
    layout: "position",
    animate: {
      opacity: state ? 1 : 0,
    },
    style: {
      width: state ? "auto" : 0,
    },
    transition: {
      scale: {
        duration: 0.5,
        type: "spring",
        bounce: 0.3,
      },
      default: {
        ease: [0.19, 1, 0.22, 1],
        duration: 0.4,
      },
    },
  };
}
