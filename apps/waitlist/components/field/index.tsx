import { Field as BaseField } from "@base-ui-components/react/field";
import type React from "react";
import styles from "./styles.module.css";

interface FieldRootProps
  extends React.ComponentPropsWithRef<typeof BaseField.Root> {}
function FieldRoot(props: FieldRootProps) {
  return <BaseField.Root className={styles.field} {...props} />;
}

interface FieldLabelProps
  extends React.ComponentPropsWithRef<typeof BaseField.Label> {}
function FieldLabel(props: FieldLabelProps) {
  return <BaseField.Label className={styles.label} {...props} />;
}

interface FieldControlProps
  extends React.ComponentPropsWithRef<typeof BaseField.Control> {}
function FieldControl(props: FieldControlProps) {
  return <BaseField.Control className={styles.control} {...props} />;
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
