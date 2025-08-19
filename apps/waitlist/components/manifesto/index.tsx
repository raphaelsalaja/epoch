"use client";

import { useForm } from "@tanstack/react-form";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { State, useButtonState } from "@/lib/stores/button-state";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "../icons/spinner";
import { container, item, reveal, spinner, text } from "./motion";
import { schema } from "./schema";
import styles from "./styles.module.css";

export function Manifesto() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { displayState, setActualState } = useButtonState();
  const state = displayState;

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setIsSuccess(false);
      setActualState(State.Loading);

      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("waitlist")
          .insert({ email: value.email });

        if (error) {
          if (error.code === "23505") {
            form.setFieldMeta("email", (prev) => ({
              ...prev,
              errors: ["This email is already on the waitlist"],
            }));
          } else {
            form.setFieldMeta("email", (prev) => ({
              ...prev,
              errors: ["Something went wrong. Please try again."],
            }));
          }
          setActualState(State.Idle);
          return;
        }

        form.reset();
        setIsSuccess(true);
        setActualState(State.Success);
      } catch {
        form.setFieldMeta("email", (prev) => ({
          ...prev,
          errors: ["Something went wrong. Please try again."],
        }));
        setActualState(State.Idle);
      }
    },
  });

  const isButtonVisible = form.state.isFormValid || isSuccess;

  return (
    <motion.div {...container} className={styles.manifesto}>
      <motion.h1 {...item}>Epoch</motion.h1>
      <motion.p {...item} className={styles.paragraph}>
        Reimagine fitness, replacing short-term tracking with a focused journey
        toward lasting progress. A personal system built for real results.
      </motion.p>
      <motion.form
        {...item}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={styles.form}
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              const result = schema.shape.email.safeParse(value);
              return result.success
                ? undefined
                : result.error.issues[0]?.message;
            },
          }}
        >
          {(field) => (
            <Field.Root style={{ width: "100%", marginTop: 24 }}>
              <Field.Control
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                placeholder="Email"
                aria-invalid={field.state.meta.errors.length > 0}
                disabled={isSuccess}
              />
              {field.state.meta.errors.length > 0 && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "4px" }}
                >
                  {field.state.meta.errors[0]?.toString()}
                </div>
              )}
            </Field.Root>
          )}
        </form.Field>

        <AnimatePresence mode="popLayout">
          {isButtonVisible && (
            <motion.div {...reveal}>
              <Button.Root
                type="submit"
                disabled={form.state.isSubmitting}
                style={{ width: "100%" }}
              >
                <motion.div {...spinner(state === State.Loading)}>
                  <Spinner />
                </motion.div>
                <Button.Label>Join</Button.Label>
                <Button.Label {...text(state === State.Loading)}>
                  ing
                </Button.Label>
                <Button.Label {...text(state !== State.Success)}>
                  <>&nbsp;</>
                  The Waitlist
                </Button.Label>
                <Button.Label {...text(state === State.Success)}>
                  ed
                </Button.Label>
              </Button.Root>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
}
