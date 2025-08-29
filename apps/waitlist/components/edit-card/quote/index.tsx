"use client";

import { AnimatePresence } from "motion/react";
import { useId } from "react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/button";
import { useQuoteForm } from "@/components/edit-card/quote/form";
import { Field } from "@/components/field";
import { MeasuredContainer } from "@/components/measured-container";
import { useShake } from "@/lib/hooks/use-shake";

import styles from "./styles.module.css";

export function EditCardQuote() {
  const textId = useId();
  const authorId = useId();
  const textShake = useShake();
  const authorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useQuoteForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    text: textShake.trigger,
    author: authorShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={textShake.ref}>
                <Field.Root name="text" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={textId}>
                    Quote
                    <Field.Length maxLength={maxLengths.text} length={length} />
                  </Field.Label>
                  <Field.Control
                    id={textId}
                    kind="textarea"
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Enter your favorite quote"
                    aria-invalid={!!errors.text}
                    aria-describedby={
                      errors.text ? `${textId}-error` : undefined
                    }
                    maxLength={maxLengths.text}
                  />
                  <AnimatePresence>
                    {errors.text && (
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
                        {errors.text.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => {
            const length = field.value?.length ?? 0;
            return (
              <MeasuredContainer ref={authorShake.ref}>
                <Field.Root name="author" invalid={fieldState.invalid}>
                  <Field.Label htmlFor={authorId}>
                    Author
                    <Field.Length
                      length={length}
                      maxLength={maxLengths.author}
                    />
                  </Field.Label>
                  <Field.Control
                    id={authorId}
                    type="text"
                    {...field}
                    value={field.value ?? ""}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="Quote author"
                    aria-invalid={!!errors.author}
                    aria-describedby={
                      errors.author ? `${authorId}-error` : undefined
                    }
                    maxLength={maxLengths.author}
                  />
                  <AnimatePresence>
                    {errors.author && (
                      <Field.Error
                        id={`${authorId}-error`}
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
                        {errors.author.message}
                      </Field.Error>
                    )}
                  </AnimatePresence>
                </Field.Root>
              </MeasuredContainer>
            );
          }}
        />

        <Button.Root type="submit">
          <Button.Label>Update Quote</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
