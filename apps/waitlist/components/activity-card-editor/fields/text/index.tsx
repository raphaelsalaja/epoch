"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";

import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";

interface TextFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  maxLength: number;
  shakeRef: React.RefObject<HTMLDivElement>;
}

export function TextFormField({
  name,
  label,
  placeholder,
  control,
  errors,
  maxLength,
  shakeRef,
}: TextFormFieldProps) {
  const fieldId = useId();
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const length = (field.value as string)?.length ?? 0;
        return (
          <MeasuredContainer ref={shakeRef}>
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
