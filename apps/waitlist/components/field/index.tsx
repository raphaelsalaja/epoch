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

interface FieldErrorProps
  extends React.ComponentPropsWithRef<typeof BaseField.Error> {}
function FieldError(props: FieldErrorProps) {
  return <BaseField.Error className={styles.error} {...props} />;
}

interface FieldDescriptionProps
  extends React.ComponentPropsWithRef<typeof BaseField.Description> {}
function FieldDescription(props: FieldDescriptionProps) {
  return <BaseField.Description className={styles.description} {...props} />;
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Error: FieldError,
  Description: FieldDescription,
};
