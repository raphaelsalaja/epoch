"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { State, useButtonState } from "@/lib/stores/button-state";
import { useGeneration } from "@/lib/stores/generation";
import { useStepStore } from "@/lib/stores/step-state";
import { Spinner } from "../icons/spinner";
import { container, item, reveal, spinner, text } from "./motion";
import styles from "./styles.module.css";

const NAME_MAX_LENGTH = 100;
const ACTIVITY_MAX_LENGTH = 200;

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters`),
  activity: z
    .string()
    .trim()
    .min(2, "Please enter what you did")
    .max(
      ACTIVITY_MAX_LENGTH,
      `Activity must be at most ${ACTIVITY_MAX_LENGTH} characters`
    ),
});

type FormValues = z.infer<typeof schema>;

export function Generation() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { displayState, setActualState } = useButtonState();
  const [ref, animate] = useAnimate();
  const setGeneration = useGeneration((s) => s.setGeneration);
  const nextStep = useStepStore((s) => s.nextStep);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", activity: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid: SubmitHandler<FormValues> = (data) => {
    setActualState(State.Loading);

    setTimeout(() => {
      const { name, activity } = data;
      setGeneration({ name, result: activity });
      setIsSuccess(true);

      setTimeout(() => {
        nextStep();
      }, 1000);
    }, 1000);
  };

  const onInvalid = () => {
    animate(
      ref.current,
      { x: [-6, 0] },
      { type: "spring", stiffness: 200, damping: 2, mass: 0.1 }
    );
  };

  return (
    <motion.div {...container} className={styles.generation}>
      <motion.h1 {...item}>Thank you for your interest.</motion.h1>

      <motion.p {...item} className={styles.paragraph}>
        Before you go, we’d love to create a small memento from your last
        workout. Could you share a few quick details?
      </motion.p>

      <motion.form
        {...item}
        onSubmit={handleSubmit(onValid, onInvalid)}
        className={styles.form}
      >
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field.Root
              name="name"
              invalid={fieldState.invalid}
              disabled={isSuccess}
            >
              <Field.Label>What do you go by?</Field.Label>
              <Field.Control
                type="text"
                {...field}
                spellCheck={false}
                autoComplete="off"
                maxLength={NAME_MAX_LENGTH}
                placeholder="eg. John Doe"
                aria-invalid={!!errors.name}
                disabled={isSuccess}
              />
            </Field.Root>
          )}
        />

        <Controller
          name="activity"
          control={control}
          render={({ field, fieldState }) => (
            <Field.Root
              name="activity"
              invalid={fieldState.invalid}
              disabled={isSuccess}
            >
              <Field.Label>What did you do?</Field.Label>
              <Field.Control
                {...field}
                kind="textarea"
                type="text"
                spellCheck={false}
                autoComplete="off"
                maxLength={ACTIVITY_MAX_LENGTH}
                placeholder="eg. I had a white monster beforehand, then did a quick run followed by a heavy lift session."
                aria-invalid={!!errors.activity}
                disabled={isSuccess}
              />
            </Field.Root>
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
                <Button.Label {...text(displayState === State.Idle)}>
                  Continue
                </Button.Label>
                <Button.Label {...spinner(displayState === State.Loading)}>
                  Saving
                </Button.Label>
                <Button.Label {...text(displayState === State.Success)}>
                  Saved
                </Button.Label>
              </Button.Root>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}
