"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";
import { ColorPalette } from "@/components/pallete";
import { useShake } from "@/lib/hooks/use-shake";
import { useActivityForm } from "./form";
import styles from "./styles.module.css";

export function EditCardActivity() {
  const textId = useId();
  const descriptionId = useId();
  const colorId = useId();
  const textShake = useShake();
  const descriptionShake = useShake();
  const colorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useActivityForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    title: textShake.trigger,
    description: descriptionShake.trigger,
    color: colorShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={textShake.ref}>
                <Field.Root name="title" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={textId}>
                    Activity Title
                    <Field.Length
                      maxLength={maxLengths.title}
                      length={length}
                    />
                  </Field.Label>
                  <Field.Control
                    id={textId}
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Enter your favorite quote"
                    aria-invalid={!!errors.title}
                    aria-describedby={
                      errors.title ? `${textId}-error` : undefined
                    }
                    maxLength={maxLengths.title}
                  />
                  <AnimatePresence>
                    {errors.title && (
                      <Field.Error
                        id={`${textId}-error`}
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
          name="description"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={descriptionShake.ref}>
                <Field.Root name="description" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={descriptionId}>
                    Activity Description
                    <Field.Length
                      length={length}
                      maxLength={maxLengths.description}
                    />
                  </Field.Label>
                  <Field.Control
                    id={descriptionId}
                    type="text"
                    kind="textarea"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Quote author"
                    aria-invalid={!!errors.description}
                    aria-describedby={
                      errors.description ? `${descriptionId}-error` : undefined
                    }
                    maxLength={maxLengths.description}
                  />
                  <AnimatePresence>
                    {errors.description && (
                      <Field.Error
                        id={`${descriptionId}-error`}
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
                        {errors.description.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Controller
          name="color"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <MeasuredContainer ref={colorShake.ref}>
                <Field.Root name="color" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={colorId}>Activity Color</Field.Label>
                  <Field.Control
                    id={colorId}
                    render={() => (
                      <ColorPalette
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        name={field.name}
                      />
                    )}
                  />
                  <AnimatePresence>
                    {errors.color && (
                      <Field.Error
                        id={`${colorId}-error`}
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
                        {errors.color.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Button.Root type="submit">
          <Button.Label>Update Activity</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
