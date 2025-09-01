import { Field as BaseField } from "@base-ui-components/react/field";
import clsx from "clsx";
import { motion } from "motion/react";
import type React from "react";
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
  ...props
}: FieldControlProps) {
  switch (kind) {
    case "input":
      return (
        <BaseField.Control
          {...props}
          data-field-control={kind}
          className={clsx(styles.control, className)}
        />
      );
    case "textarea":
      return (
        <BaseField.Control
          {...props}
          className={clsx(styles.control, className)}
          render={(props) => <textarea data-field-control={kind} {...props} />}
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
