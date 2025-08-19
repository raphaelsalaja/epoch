"use client";

import { AnimatePresence, motion, stagger } from "motion/react";
import { useRef, useState } from "react";

import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { State, useButtonState } from "@/lib/stores/button-state";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "../icons/spinner";
import { container, item, reveal, spinner, text } from "./motion";
import { schema } from "./schema";
import styles from "./styles.module.css";

export function Manifesto() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { displayState, setActualState } = useButtonState();
  const state = displayState;

  const isValid = schema.safeParse({ email }).success;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setIsSuccess(false);
    setActualState(State.Loading);

    try {
      const validatedData = schema.parse({ email });
      const supabase = createClient();
      const { error } = await supabase
        .from("waitlist")
        .insert({ email: validatedData.email });
      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "This email is already on the waitlist" });
        } else {
          setErrors({ email: "Something went wrong. Please try again." });
        }
        setActualState(State.Idle);
        return;
      }
      setEmail("");
      setIsSuccess(true);
      setActualState(State.Success);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            formErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(formErrors);
      } else {
        setErrors({ email: "Something went wrong. Please try again." });
      }
      setActualState(State.Idle);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonVisible = isValid || isSuccess;

  return (
    <motion.div {...container} className={styles.manifesto}>
      <motion.h1 {...item}>Epoch</motion.h1>
      <motion.p {...item} className={styles.paragraph}>
        Reimagine fitness, replacing short-term tracking with a focused journey
        toward lasting progress. A personal system built for real results.
      </motion.p>
      <motion.form {...item} onSubmit={handleSubmit} className={styles.form}>
        <Field.Root style={{ width: "100%", marginTop: 24 }}>
          <Field.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="Email"
            aria-invalid={!!errors.email}
            disabled={isSuccess}
          />
        </Field.Root>

        <AnimatePresence mode="popLayout">
          {isButtonVisible && (
            <motion.div {...reveal}>
              <Button.Root
                type="submit"
                disabled={isSubmitting}
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
