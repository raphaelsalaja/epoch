"use client";

import { TextareaFormField } from "@/components/edit-card/fields";
import { EditCardBase } from "@/components/edit-card/shared/edit-card-base";
import { useShake } from "@/lib/hooks/use-shake";
import { useSummaryForm } from "./form";

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
    <EditCardBase
      buttonText="Update Summary"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <TextareaFormField
        name="text"
        label="Summary"
        placeholder="Write a brief summary of your day..."
        control={control}
        errors={errors}
        maxLength={maxLengths.text}
        shakeRef={textShake.ref}
      />
    </EditCardBase>
  );
}
