"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import {
  type FieldValues,
  type Path,
  useController,
  useFormContext,
} from "react-hook-form";

import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";
import { Picker } from "@/components/picker";

interface ColorFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  shakeRef: React.RefObject<HTMLDivElement>;
}

export function ColorFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  shakeRef,
}: ColorFormFieldProps<TFieldValues>) {
  const fieldId = useId();
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController<TFieldValues>({ name, control });
  const error = fieldState.error;

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
              {String(error?.message ?? "Invalid input")}
            </Field.Error>
          )}
        </AnimatePresence>
      </Field.Root>
    </MeasuredContainer>
  );
}
