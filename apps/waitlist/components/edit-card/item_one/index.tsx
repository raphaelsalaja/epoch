"use client";

import { ImageFormField, TextFormField } from "@/components/edit-card/fields";
import { EditCardBase } from "@/components/edit-card/shared/edit-card-base";
import { useShake } from "@/lib/hooks/use-shake";
import { useItemOneForm } from "./form";

export function EditCardItemOne() {
  const titleShake = useShake();
  const subtitleShake = useShake();
  const imageShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useItemOneForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    title: titleShake.trigger,
    subtitle: subtitleShake.trigger,
    image: imageShake.trigger,
  });

  return (
    <EditCardBase
      buttonText="Update Item"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <ImageFormField
        name="image"
        label="Item Image"
        control={control}
        errors={errors}
        shakeRef={imageShake.ref}
      />

      <TextFormField
        name="title"
        label="Item Title"
        placeholder="Enter the title"
        control={control}
        errors={errors}
        maxLength={maxLengths.title}
        shakeRef={titleShake.ref}
      />

      <TextFormField
        name="subtitle"
        label="Item Description"
        placeholder="Enter the description"
        control={control}
        errors={errors}
        maxLength={maxLengths.subtitle}
        shakeRef={subtitleShake.ref}
      />
    </EditCardBase>
  );
}
