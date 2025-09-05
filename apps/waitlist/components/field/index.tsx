"use client";

import { Field as BaseField } from "@base-ui-components/react/field";
import clsx from "clsx";
import { motion } from "motion/react";
import type React from "react";
import { useCallback } from "react";
import useSound from "use-sound";
import styles from "./styles.module.css";

const MotionFieldRoot = motion.create(BaseField.Root);

interface FieldRootProps
  extends React.ComponentPropsWithoutRef<typeof MotionFieldRoot> {}

function FieldRoot({ className, ...props }: FieldRootProps) {
  return (
    <MotionFieldRoot className={clsx(styles.field, className)} {...props} />
  );
}

interface FieldLabelProps
  extends React.ComponentPropsWithRef<typeof BaseField.Label> {}
function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label className={clsx(styles.label, className)} {...props} />
  );
}

interface FieldLengthProps extends React.ComponentPropsWithRef<"span"> {
  length?: number;
  maxLength?: number;
}
function FieldLength({ length, maxLength, ...props }: FieldLengthProps) {
  if (!maxLength) return null;

  return (
    <span className={styles.length} data-field-length={maxLength} {...props}>
      {length ?? 0}/{maxLength}
    </span>
  );
}

interface FieldControlProps
  extends React.ComponentPropsWithRef<typeof BaseField.Control> {
  kind?: "input" | "textarea";
}
function FieldControl({
  kind = "input",
  className,
  onValueChange,
  ...props
}: FieldControlProps) {
  const [playType1] = useSound("/media/sounds/type_01.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType2] = useSound("/media/sounds/type_02.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType3] = useSound("/media/sounds/type_03.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType4] = useSound("/media/sounds/type_04.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const [playType5] = useSound("/media/sounds/type_05.wav", {
    preload: true,
    interrupt: true,
    volume: 0.5,
  });

  const playRandom = useCallback(() => {
    const players = [playType1, playType2, playType3, playType4, playType5];
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    randomPlayer();
  }, [playType1, playType2, playType3, playType4, playType5]);

  switch (kind) {
    case "input":
      return (
        <BaseField.Control
          {...props}
          onValueChange={(value, event) => {
            playRandom();
            onValueChange?.(value, event);
          }}
          className={clsx(styles.control, className)}
        />
      );
    case "textarea":
      return (
        <BaseField.Control
          {...props}
          onValueChange={(value, event) => {
            playRandom();
            onValueChange?.(value, event);
          }}
          className={clsx(styles.control, className)}
          render={(p) => <textarea data-field-control={kind} {...p} />}
        />
      );
  }
}

const MotionFieldError = motion.create(BaseField.Error);

interface FieldErrorProps
  extends React.ComponentPropsWithoutRef<typeof MotionFieldError> {}

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <MotionFieldError className={clsx(styles.error, className)} {...props} />
  );
}

interface FieldDescriptionProps
  extends React.ComponentPropsWithRef<typeof BaseField.Description> {}
function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={clsx(styles.description, className)}
      {...props}
    />
  );
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Length: FieldLength,
  Control: FieldControl,
  Error: FieldError,
  Description: FieldDescription,
};
