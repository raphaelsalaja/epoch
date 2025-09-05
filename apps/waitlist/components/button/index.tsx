import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";
import { useSoundController } from "../../lib/sounds";
import styles from "./styles.module.css";

interface RootProps extends HTMLMotionProps<"button"> {
  asChild?: boolean;
}

function Root({ className, asChild = false, ...props }: RootProps) {
  const { play } = useSoundController();

  const { onClick, onSubmit, onPointerDown } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    play("button");
    onClick?.(event);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    play("button");
    onSubmit?.(event);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    play("button");
    onPointerDown?.(event);
  };

  if (asChild) {
    return (
      <Slot
        data-slot="button"
        onClick={handleClick}
        onSubmit={handleSubmit}
        onPointerDown={handlePointerDown}
        className={clsx(styles.button, className)}
        {...(props as React.ComponentProps<typeof Slot>)}
      />
    );
  }

  return (
    <motion.button
      data-slot="button"
      onClick={handleClick}
      onSubmit={handleSubmit}
      onPointerDown={handlePointerDown}
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
