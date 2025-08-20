"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { animate } from "motion";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { State, useButtonState } from "@/lib/stores/button-state";
import { createClient } from "@/lib/supabase/client";
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = async ({ email }: FormValues) => {
    setIsSuccess(false);
    setActualState(State.Loading);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist").insert({ email });
      if (error) {
        if (error.code === "23505") {
          setError("email", {
            message: "This email is already on the waitlist",
          });
        } else {
          setError("email", {
            message: "Something went wrong. Please try again.",
          });
        }
        setActualState(State.Idle);
        return;
      }
      reset();
      setIsSuccess(true);
      setActualState(State.Success);
    } catch {
      setError("email", { message: "Something went wrong. Please try again." });
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
          <motion.div {...reveal}>
            <Button.Root
              type="submit"
              disabled={isSubmitting}
              style={{ width: "100%" }}
            >
              <motion.div {...spinner(displayState === State.Loading)}>
                <Spinner />
              </motion.div>
              <Button.Label>Join</Button.Label>
              <Button.Label {...text(displayState === State.Loading)}>
                ing
              </Button.Label>
              <Button.Label {...text(displayState !== State.Success)}>
                <>&nbsp;</>The Waitlist
              </Button.Label>
              <Button.Label {...text(displayState === State.Success)}>
                ed
              </Button.Label>
            </Button.Root>
          </motion.div>
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
