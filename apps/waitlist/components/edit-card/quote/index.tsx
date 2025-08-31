"use client";

import {
  TextareaFormField,
  TextFormField,
} from "@/components/edit-card/fields";
import { useQuoteForm } from "@/components/edit-card/quote/form";
import { EditCardBase } from "@/components/edit-card/shared/edit-card-base";
import { useShake } from "@/lib/hooks/use-shake";

export function EditCardQuote() {
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
    <EditCardBase
      buttonText="Update Quote"
      onSubmit={handleSubmit(onValid, onInvalid)}
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
    </EditCardBase>
  );
}
