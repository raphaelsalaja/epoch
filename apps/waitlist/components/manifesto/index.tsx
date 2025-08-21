"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { State, useButtonState } from "@/lib/stores/button-state";
import { useStepStore } from "@/lib/stores/step-state";
import { Spinner } from "../icons/spinner";
import { container, item, reveal, spinner, text } from "./motion";
import styles from "./styles.module.css";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function Manifesto() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { displayState, setActualState } = useButtonState();
  const [ref, animate] = useAnimate();
  const { setEmail, nextStep } = useStepStore();

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
    setActualState(State.Loading);

    // Simulate email signup delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Store email and proceed to next step
      setEmail(email);
      setIsSuccess(true);
      setActualState(State.Success);

      // Wait a moment for success animation, then proceed
      setTimeout(() => {
        nextStep();
      }, 1500);
    } catch {
      setActualState(State.Idle);
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
    <motion.div {...container} className={styles.manifesto}>
      <motion.h1 {...item}>Epoch</motion.h1>
      <motion.p {...item} className={styles.paragraph}>
        Reimagine fitness, replacing short-term tracking with a focused journey
        toward lasting progress. A personal system built for real results.
      </motion.p>

      <motion.form
        {...item}
        onSubmit={handleSubmit(onValid, onInvalid)}
        className={styles.form}
      >
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <motion.div ref={ref} style={{ width: "100%", marginTop: 24 }}>
              <Field.Root
                name="email"
                invalid={fieldState.invalid}
                disabled={isSuccess}
              >
                <Field.Control
                  type="text"
                  {...field}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="Email"
                  aria-invalid={!!errors.email}
                  disabled={isSuccess}
                />
              </Field.Root>
            </motion.div>
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
                <motion.div {...spinner(displayState === State.Loading)}>
                  <Spinner />
                </motion.div>
                <Button.Label>Join</Button.Label>
                <Button.Label {...text(displayState === State.Loading)}>
                  ing
                </Button.Label>
                <Button.Label {...text(displayState === State.Success)}>
                  ed!
                </Button.Label>
                <Button.Label {...text(displayState !== State.Success)}>
                  <>&nbsp;</>The Waitlist
                </Button.Label>
              </Button.Root>
            </motion.div>
          )}
        </AnimatePresence>

        {errors.email?.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.error}
          >
            {errors.email.message}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}
