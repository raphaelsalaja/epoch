import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type * as React from "react";

import styles from "./styles.module.css";

interface RootProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function Root({ className, asChild = false, ...props }: RootProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={clsx(styles.button, className)}
      {...props}
    />
  );
}

interface LabelProps extends React.ComponentProps<"span"> {}

function Label({ className, ...props }: LabelProps) {
  return <span className={clsx(styles.label, className)} {...props} />;
}

export const Button = {
  Root,
  Label,
};
