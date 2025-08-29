"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { QuoteSchema, useCardStore } from "@/lib/stores/card";
import { Spinner } from "../../icons/spinner";
import { reveal, spinner, text } from "./motion";
import styles from "./styles.module.css";

type FormValues = z.infer<typeof QuoteSchema>;

export function EditCardQuote() {
  const [ref, animate] = useAnimate();
  const { card, updateQuote } = useCardStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: {
      text: card.quote.text || "",
      author: card.quote.author || "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = async ({ text, author }: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      updateQuote({ text, author });

      setTimeout(() => {}, 1500);
    } catch {}
  };

  const onInvalid = () => {
    animate(
      ref.current,
      { x: [-6, 0] },
      { type: "spring", stiffness: 200, damping: 2, mass: 0.1 }
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => (
            <Field.Root name="text" invalid={fieldState.invalid}>
              <Field.Label>Quote</Field.Label>
              <Field.Control
                type="text"
                {...field}
                spellCheck={false}
                autoComplete="off"
                placeholder="Enter your favorite quote"
                aria-invalid={!!errors.text}
              />
            </Field.Root>
          )}
        />

        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <Field.Root name="author" invalid={fieldState.invalid}>
              <Field.Label>Author</Field.Label>
              <Field.Control
                type="text"
                {...field}
                spellCheck={false}
                autoComplete="off"
                placeholder="Quote author"
                aria-invalid={!!errors.author}
              />
            </Field.Root>
          )}
        />

        <Button.Root type="submit" disabled={isSubmitting} layout>
          <Button.Label>Save Changes</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
