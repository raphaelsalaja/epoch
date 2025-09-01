"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";
import { Field } from "@/components/field";
import { Icon } from "@/components/icons/helpers";
import type { IconName } from "@/components/icons/types";
import { MeasuredContainer } from "@/components/measured-container";
import type { ColorName } from "@/components/picker";
import { Picker } from "@/components/picker";
import styles from "../styles.module.css";

interface ImageFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  shakeRef: React.RefObject<HTMLDivElement>;
}

export const updateImageColor = (currentValue: unknown, newColor: string) => {
  const safeColor = newColor as ColorName;
  return {
    color: safeColor,
    icon: (typeof currentValue === "object" &&
    currentValue &&
    "icon" in currentValue
      ? currentValue.icon
      : "crown") as IconName,
  };
};

export const updateImageIcon = (currentValue: unknown, newIcon: string) => {
  const safeIcon = newIcon as IconName;
  return {
    color: (typeof currentValue === "object" &&
    currentValue &&
    "color" in currentValue
      ? currentValue.color
      : "blue") as ColorName,
    icon: safeIcon,
  };
};

type ImageValue = { color: ColorName; icon: IconName };

export function ImageFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  shakeRef,
}: ImageFormFieldProps<TFieldValues>) {
  const fieldId = useId();
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController<TFieldValues>({ name, control });
  const error = fieldState.error;

  const imageValue: ImageValue =
    typeof field.value === "object" &&
    field.value &&
    "color" in field.value &&
    "icon" in field.value
      ? (field.value as ImageValue)
      : { color: "blue", icon: "crown" };

  return (
    <MeasuredContainer ref={shakeRef}>
      <Field.Root name={name} invalid={fieldState.invalid}>
        <Field.Control
          id={fieldId}
          render={() => (
            <div className={styles.visual}>
              <Picker.Icon
                kind="grid"
                value={imageValue.icon}
                onValueChange={(value) => {
                  if (typeof value === "string") {
                    field.onChange(updateImageIcon(field.value, value));
                  }
                }}
                name={field.name}
              />

              <div
                className={styles.preview}
                style={{ background: `var(--${imageValue.color})` }}
              >
                <motion.div
                  key={imageValue.icon}
                  initial={false}
                  animate={{
                    scaleX: [1.3, 1],
                    scaleY: [0.8, 1],
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 2,
                    mass: 0.1,
                  }}
                  style={{
                    transformOrigin: "center center",
                  }}
                >
                  <Icon name={imageValue.icon} className={styles.icon} />
                </motion.div>
              </div>

              <Picker.Color
                kind="grid"
                value={imageValue.color}
                onValueChange={(value) => {
                  if (typeof value === "string") {
                    field.onChange(updateImageColor(field.value, value));
                  }
                }}
                name={field.name}
              />
            </div>
          )}
        />
        <AnimatePresence>
          {error && (
            <Field.Error
              id={`${fieldId}-error`}
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.24,
                ease: [0.19, 1, 0.22, 1],
              }}
              match
            >
              {String(error?.message ?? "Invalid input")}
            </Field.Error>
          )}
        </AnimatePresence>
      </Field.Root>
    </MeasuredContainer>
  );
}
