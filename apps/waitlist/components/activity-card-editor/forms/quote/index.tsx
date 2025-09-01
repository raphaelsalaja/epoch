"use client";

import {
  TextareaFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { useQuoteForm } from "@/components/activity-card-editor/forms/quote/form";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";
import styles from "../styles.module.css";

interface Props {
  onDone?: () => void;
}

export function EditCardQuote({ onDone }: Props) {
  const textShake = useShake();
  const authorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useQuoteForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    text: textShake.trigger,
    author: authorShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form
        id="edit-quote-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          onDone?.();
        }, onInvalid)}
        className={styles.form}
      >
        <TextareaFormField
          name="text"
          label="Quote"
          placeholder="Enter your favorite quote"
          control={control}
          errors={errors}
          maxLength={maxLengths.text}
          shakeRef={textShake.ref}
        />

        <TextFormField
          name="author"
          label="Author"
          placeholder="Quote author"
          control={control}
          errors={errors}
          maxLength={maxLengths.author}
          shakeRef={authorShake.ref}
        />

        <Button.Root type="submit">
          <Button.Label>Update Quote</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </form>
    </div>
  );
}
