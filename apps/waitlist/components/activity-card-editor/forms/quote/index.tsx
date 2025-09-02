"use client";

import { motion } from "motion/react";
import { FormProvider } from "react-hook-form";
import {
  TextareaFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { useQuoteForm } from "@/components/activity-card-editor/forms/quote/form";
import { Button } from "@/components/button";
import { MeasuredContainer } from "@/components/measured-container";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import styles from "../styles.module.css";

export function EditCardQuote() {
  const { setView } = useViewStore();
  const { form, onValid, maxLengths } = useQuoteForm();
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <motion.form
        {...viewTransition}
        id="edit-quote-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          setView("card");
        })}
        className={styles.form}
      >
        <TextareaFormField
          name="text"
          label="Quote"
          placeholder="e.g. You either die a hero or you live long enough to become the villain"
          maxLength={maxLengths.text}
        />

        <TextFormField
          name="author"
          label="Author"
          placeholder="e.g. Harvey Dent"
          maxLength={maxLengths.author}
        />

        <Button.Root type="submit">
          <Button.Label>Update Quote</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </motion.form>
    </FormProvider>
  );
}
