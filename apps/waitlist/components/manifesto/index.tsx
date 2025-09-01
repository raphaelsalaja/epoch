"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Spinner } from "../icons/spinner";
import { reveal, spinner, text } from "./motion";
import styles from "./styles.module.css";

enum ButtonState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
}

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function Manifesto() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonState, setButtonState] = useState(ButtonState.Idle);
  const [ref, animate] = useAnimate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = async ({ email }: FormValues) => {
    setIsSuccess(false);
    setButtonState(ButtonState.Loading);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      setIsSuccess(true);
      setButtonState(ButtonState.Success);
    } catch {
      setButtonState(ButtonState.Idle);
    }
  };

  const onInvalid = () => {
    animate(
      ref.current,
      { x: [-6, 0] },
      { type: "spring", stiffness: 200, damping: 2, mass: 0.1 }
    );
  };

  return (
    <div className={styles.manifesto}>
      <div className={styles.text}>
        <h1>Epoch</h1>
        <p className={styles.paragraph}>
          Replace short-term tracking
          <br />
          with a focused journey toward lasting progress.
          <br />A personal system built for real results.
        </p>
      </div>
      <form
        method="post"
        action="#"
        aria-busy={isSubmitting}
        onSubmit={handleSubmit(onValid, onInvalid)}
        className={styles.form}
      >
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div ref={ref} style={{ width: "100%", marginTop: 24 }}>
              <Field.Root
                name="email"
                invalid={fieldState.invalid}
                disabled={isSuccess}
              >
                {/* Visually hidden label for accessibility */}
                <Field.Label htmlFor="email" className="sr">
                  Email address
                </Field.Label>
                <Field.Control
                  id="email"
                  type="email"
                  {...field}
                  spellCheck={false}
                  autoComplete="email"
                  required
                  placeholder="Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSuccess}
                />
              </Field.Root>
            </div>
          )}
        />

        <AnimatePresence mode="popLayout">
          {(isValid || isSubmitting) && (
            <motion.div {...reveal}>
              <Button.Root
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                layout
              >
                <Button.Label {...spinner(buttonState === ButtonState.Loading)}>
                  <Spinner />
                </Button.Label>
                <Button.Label>Join</Button.Label>
                <Button.Label {...text(buttonState === ButtonState.Loading)}>
                  ing
                </Button.Label>
                <Button.Label {...text(buttonState === ButtonState.Success)}>
                  ed!
                </Button.Label>
                <Button.Label {...text(buttonState !== ButtonState.Success)}>
                  <>&nbsp;</>The Waitlist
                </Button.Label>
              </Button.Root>
            </motion.div>
          )}
        </AnimatePresence>

        {errors.email?.message && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16 }}
            className={styles.error}
            role="alert"
            aria-live="polite"
            id="email-error"
          >
            {errors.email.message}
          </motion.span>
        )}
      </form>
    </div>
  );
}
