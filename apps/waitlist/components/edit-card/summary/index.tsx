"use client";

import { Button } from "@/components/button";
import { TextareaFormField } from "@/components/edit-card/fields";
import { useShake } from "@/lib/hooks/use-shake";
import { useSummaryForm } from "./form";
import styles from "./styles.module.css";

export function EditCardSummary() {
  const textShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useSummaryForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    text: textShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <TextareaFormField
          name="text"
          label="Summary"
          placeholder="Write a brief summary of your day..."
          control={control}
          errors={errors}
          maxLength={maxLengths.text}
          shakeRef={textShake.ref}
        />

        <Button.Root type="submit">
          <Button.Label>Update Summary</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
