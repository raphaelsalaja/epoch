import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";
import styles from "./styles.module.css";

interface RootProps extends HTMLMotionProps<"button"> {
  asChild?: boolean;
}

function Root({ className, asChild = false, ...props }: RootProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={clsx(styles.button, className)}
        {...(props as React.ComponentProps<typeof Slot>)}
      />
    );
  }

  return (
    <motion.button
      data-slot="button"
      className={clsx(styles.button, className)}
      {...props}
    />
  );
}

interface LabelProps extends HTMLMotionProps<"span"> {}

function Label({ className, ...props }: LabelProps) {
  return <motion.span className={clsx(styles.label, className)} {...props} />;
}

export const Button = {
  Root,
  Label,
};
