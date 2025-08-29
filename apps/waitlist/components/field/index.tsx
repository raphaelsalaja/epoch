import { Field as BaseField } from "@base-ui-components/react/field";
import { motion } from "motion/react";
import type React from "react";
import styles from "./styles.module.css";

const MotionFieldRoot = motion.create(BaseField.Root);

interface FieldRootProps
  extends React.ComponentPropsWithoutRef<typeof MotionFieldRoot> {}

function FieldRoot(props: FieldRootProps) {
  return <MotionFieldRoot className={styles.field} {...props} />;
}

interface FieldLabelProps
  extends React.ComponentPropsWithRef<typeof BaseField.Label> {}
function FieldLabel(props: FieldLabelProps) {
  return <BaseField.Label className={styles.label} {...props} />;
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
function FieldControl({ kind = "input", ...props }: FieldControlProps) {
  switch (kind) {
    case "input":
      return (
        <BaseField.Control
          {...props}
          data-field-control={kind}
          className={styles.control}
        />
      );
    case "textarea":
      return (
        <BaseField.Control
          {...props}
          className={styles.control}
          render={(props) => <textarea data-field-control={kind} {...props} />}
        />
      );
  }
}

const MotionFieldError = motion.create(BaseField.Error);

interface FieldErrorProps
  extends React.ComponentPropsWithoutRef<typeof MotionFieldError> {}

function FieldError(props: FieldErrorProps) {
  return <MotionFieldError className={styles.error} {...props} />;
}

interface FieldDescriptionProps
  extends React.ComponentPropsWithRef<typeof BaseField.Description> {}
function FieldDescription(props: FieldDescriptionProps) {
  return <BaseField.Description className={styles.description} {...props} />;
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Length: FieldLength,
  Control: FieldControl,
  Error: FieldError,
  Description: FieldDescription,
};
