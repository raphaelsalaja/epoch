"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";

import { Field } from "@/components/field";
import type { IconName } from "@/components/icons/types";
import { MeasuredContainer } from "@/components/measured-container";
import type { ColorName } from "@/components/picker";
import { Picker } from "@/components/picker";

interface ImageFormFieldProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  shakeRef: React.RefObject<HTMLDivElement>;
}

// Helper functions for image field updates
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

export function ImageFormField({
  name,
  label,
  control,
  errors,
  shakeRef,
}: ImageFormFieldProps) {
  const fieldId = useId();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // Ensure we always have an object with color and icon
        const imageValue =
          typeof field.value === "object" &&
          field.value?.color &&
          field.value?.icon
            ? field.value
            : { color: "blue" as const, icon: "crown" as const };

        return (
          <MeasuredContainer ref={shakeRef}>
            <Field.Root name={name} invalid={fieldState.invalid}>
              <Field.Label htmlFor={fieldId}>{label}</Field.Label>
              <Field.Control
                id={fieldId}
                render={() => (
                  <div>
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
                    {String(
                      typeof error === "string"
                        ? error
                        : (error?.message ?? "Invalid input"),
                    )}
                  </Field.Error>
                )}
              </AnimatePresence>
            </Field.Root>
          </MeasuredContainer>
        );
      }}
    />
  );
}
