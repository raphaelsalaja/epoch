"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { useShake } from "@/lib/hooks/use-shake";
import { reveal, spinner, text } from "@/lib/motion";
import { Schemas } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "../icons/spinner";
import styles from "./styles.module.css";

enum ButtonState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
}

type FormValues = z.infer<typeof Schemas.SignUp>;

export function Manifesto({ onSuccess }: { onSuccess?: () => void }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonState, setButtonState] = useState(ButtonState.Idle);
  const { ref, trigger: shake } = useShake();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(Schemas.SignUp),
    defaultValues: { email: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = async ({ email: _email }: FormValues) => {
    setIsSuccess(false);
    setButtonState(ButtonState.Loading);

    try {
      const supabase = createClient();
      const email = _email.trim().toLowerCase();
      const { error } = await supabase
        .from("waitlist")
        .upsert([{ email }], { onConflict: "email" });

      if (!error) {
        setIsSuccess(true);
        setButtonState(ButtonState.Success);
      } else {
        setIsSuccess(true);
        setButtonState(ButtonState.Success);
      }
    } catch {
      setIsSuccess(true);
      setButtonState(ButtonState.Success);
    } finally {
      setTimeout(() => {
        onSuccess?.();
      }, 600);
    }
  };

  const onInvalid = () => {
    shake();
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
                <Field.Label htmlFor="email" className="sr">
                  Email address
                </Field.Label>
                <Field.Control
                  {...field}
                  id="email"
                  type="text"
                  spellCheck={false}
                  autoComplete="off"
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
