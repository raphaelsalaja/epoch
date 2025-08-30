"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";
import { Picker } from "@/components/picker";
import { useShake } from "@/lib/hooks/use-shake";
import { updateImageColor, updateImageIcon, useItemOneForm } from "./form";
import styles from "./styles.module.css";

export function EditCardItemOne() {
  const titleId = useId();
  const subtitleId = useId();
  const imageId = useId();
  const titleShake = useShake();
  const subtitleShake = useShake();
  const imageShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useItemOneForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    title: titleShake.trigger,
    subtitle: subtitleShake.trigger,
    image: imageShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <Controller
          name="image"
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
              <MeasuredContainer ref={imageShake.ref}>
                <Field.Root name="image" invalid={fieldState.invalid}>
                  <Field.Control
                    id={imageId}
                    render={() => (
                      <div>
                        <Picker.Color
                          kind="grid"
                          value={imageValue.color}
                          onValueChange={(value) => {
                            if (typeof value === "string") {
                              field.onChange(
                                updateImageColor(field.value, value)
                              );
                            }
                          }}
                          name={field.name}
                        />
                        <Picker.Icon
                          kind="grid"
                          value={imageValue.icon}
                          onValueChange={(value) => {
                            if (typeof value === "string") {
                              field.onChange(
                                updateImageIcon(field.value, value)
                              );
                            }
                          }}
                          name={field.name}
                        />
                      </div>
                    )}
                  />
                  <AnimatePresence>
                    {errors.image && (
                      <Field.Error
                        id={`${imageId}-error`}
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
                        {errors.image.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={titleShake.ref}>
                <Field.Root name="title" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={titleId}>
                    Item Title
                    <Field.Length
                      maxLength={maxLengths.title}
                      length={length}
                    />
                  </Field.Label>
                  <Field.Control
                    id={titleId}
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Enter the title"
                    aria-invalid={!!errors.title}
                    aria-describedby={
                      errors.title ? `${titleId}-error` : undefined
                    }
                    maxLength={maxLengths.title}
                  />
                  <AnimatePresence>
                    {errors.title && (
                      <Field.Error
                        id={`${titleId}-error`}
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
                        {errors.title.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Controller
          name="subtitle"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={subtitleShake.ref}>
                <Field.Root name="subtitle" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={subtitleId}>
                    Item Description
                    <Field.Length
                      length={length}
                      maxLength={maxLengths.subtitle}
                    />
                  </Field.Label>
                  <Field.Control
                    id={subtitleId}
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Enter the description"
                    aria-invalid={!!errors.subtitle}
                    aria-describedby={
                      errors.subtitle ? `${subtitleId}-error` : undefined
                    }
                    maxLength={maxLengths.subtitle}
                  />
                  <AnimatePresence>
                    {errors.subtitle && (
                      <Field.Error
                        id={`${subtitleId}-error`}
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
                        {errors.subtitle.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Button.Root type="submit">
          <Button.Label>Update Item</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
