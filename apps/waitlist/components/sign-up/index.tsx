"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { useEffectTask } from "@/lib/hooks/use-effect-task";
import { useShake } from "@/lib/hooks/use-shake";
import { button, reveal, viewTransition } from "@/lib/motion";
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

export function SignUp({ onSuccess }: { onSuccess?: () => void }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [_buttonState, setButtonState] = useState(ButtonState.Idle);
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

  const { run, state: taskState } = useEffectTask({
    minMs: 800,
    donePulseMs: 600,
    timeoutMs: 10_000,
  });

  useEffect(() => {
    setIsSuccess(taskState === "done");
    if (taskState === "working") setButtonState(ButtonState.Loading);
    if (taskState === "done") setButtonState(ButtonState.Success);
    if (taskState === "idle") setButtonState(ButtonState.Idle);
  }, [taskState]);

  useEffect(() => {
    if (taskState === "done") {
      const t = setTimeout(() => onSuccess?.(), 600);
      return () => clearTimeout(t);
    }
  }, [taskState, onSuccess]);

  const onValid = async ({ email: _email }: FormValues) => {
    setIsReturningUser(false);
    await run(async () => {
      const supabase = createClient();
      const email = _email.trim().toLowerCase();
      const { error } = await supabase
        .from("waitlist")
        .upsert([{ email }], { onConflict: "email" });
      if (error) {
        const msg = (error.message || "").toLowerCase();
        const isDuplicate =
          /duplicate|already exists|unique|23505|conflict/.test(msg);
        const isPolicyUpdate = /row-level security|rls|permission.*update/.test(
          msg
        );
        if (isDuplicate || isPolicyUpdate) {
          setIsReturningUser(true);
          return;
        }
        throw new Error(error.message || "Waitlist signup failed");
      }
    });
  };

  const onInvalid = () => {
    shake();
  };

  return (
    <motion.div {...viewTransition} className={styles.signup}>
      <div className={styles.text}>
        <h1>Epoch</h1>
        <p className={styles.paragraph}>
          Replace short-term tracking with a focused journey toward lasting
          progress. A personal system built for real results.
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
                disabled={taskState === "working"}
                style={{ width: "100%" }}
                layout
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {taskState === "idle" && (
                    <Button.Label {...button.text}>
                      Join The Waitlist
                    </Button.Label>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  {taskState === "working" && (
                    <Button.Label {...button.spinner}>
                      <Spinner />
                    </Button.Label>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  {taskState === "done" && (
                    <Button.Label {...button.text}>
                      {isReturningUser ? "Welcome Back!" : "Joined!"}
                    </Button.Label>
                  )}
                </AnimatePresence>
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
    </motion.div>
  );
}
