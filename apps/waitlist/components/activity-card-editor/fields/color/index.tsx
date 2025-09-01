"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";
import { Picker } from "@/components/picker";

interface ColorFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  shakeRef: React.RefObject<HTMLDivElement>;
}

export function ColorFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  errors,
  shakeRef,
}: ColorFormFieldProps<TFieldValues>) {
  const fieldId = useId();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <MeasuredContainer ref={shakeRef}>
            <Field.Root name={name} invalid={fieldState.invalid}>
              <Field.Label htmlFor={fieldId}>{label}</Field.Label>
              <Field.Control
                id={fieldId}
                render={() => (
                  <Picker.Color
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    name={field.name}
                  />
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
                        : (error?.message ?? "Invalid input")
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
