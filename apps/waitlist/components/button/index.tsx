import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";
import { useSoundController } from "../../lib/sounds";
import styles from "./styles.module.css";

interface RootProps extends HTMLMotionProps<"button"> {
  asChild?: boolean;
}

function useInteractionGate(windowMs = 200) {
  const last = React.useRef(0);
  return () => {
    const now = performance.now();
    if (now - last.current < windowMs) return false;
    last.current = now;
    return true;
  };
}

function Root({
  className,
  asChild = false,
  type,
  onPointerDown,
  onKeyDown,
  ...props
}: RootProps) {
  const { play } = useSoundController();
  const allow = useInteractionGate();

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (allow()) play("button");
    onPointerDown?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      if (allow()) play("button");
    }
    onKeyDown?.(event);
  };

  const shared = {
    "data-slot": "button",
    onPointerDown: handlePointerDown,
    onKeyDown: handleKeyDown,
    className: clsx(styles.button, className),
    type: type ?? ("button" as const),
  };

  if (asChild) {
    return (
      <Slot {...shared} {...(props as React.ComponentProps<typeof Slot>)} />
    );
  }

  return <motion.button {...shared} {...props} />;
}

interface LabelProps extends HTMLMotionProps<"span"> {}

function Label({ className, ...props }: LabelProps) {
  return <motion.span className={clsx(styles.label, className)} {...props} />;
}

export const Button = { Root, Label };
