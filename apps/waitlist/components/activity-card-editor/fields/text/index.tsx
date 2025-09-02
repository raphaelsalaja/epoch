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
import { useErrorShake } from "@/lib/hooks/use-error-shake";

interface TextFormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  maxLength: number;
}

export function TextFormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  maxLength,
}: TextFormFieldProps<TFieldValues>) {
  const fieldId = useId();
  const { control } = useFormContext<TFieldValues>();
  const { field, fieldState } = useController<TFieldValues>({ name, control });
  const error = fieldState.error;
  const { ref } = useErrorShake({ fieldName: name });
  const length = (field.value as string)?.length ?? 0;

  return (
    <MeasuredContainer>
      <Field.Root name={name} invalid={fieldState.invalid}>
        <Field.Label htmlFor={fieldId}>
          {label}
          <Field.Length maxLength={maxLength} length={length} />
        </Field.Label>
        <Field.Control
          id={fieldId}
          type="text"
          {...field}
          value={field.value ?? ""}
          spellCheck={false}
          autoComplete="off"
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          maxLength={maxLength}
          ref={ref}
        />
        <AnimatePresence>
          {error && (
            <Field.Error
              match
              role="alert"
              id={`${fieldId}-error`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.24,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              {String(error?.message ?? "Invalid input")}
            </Field.Error>
          )}
        </AnimatePresence>
      </Field.Root>
    </MeasuredContainer>
  );
}
