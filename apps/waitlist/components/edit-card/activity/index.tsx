"use client";

import {
  ColorFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/edit-card/fields";
import { EditCardBase } from "@/components/edit-card/shared/edit-card-base";
import { useShake } from "@/lib/hooks/use-shake";
import { useActivityForm } from "./form";

export function EditCardActivity() {
  const titleShake = useShake();
  const descriptionShake = useShake();
  const colorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useActivityForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    title: titleShake.trigger,
    description: descriptionShake.trigger,
    color: colorShake.trigger,
  });

  return (
    <EditCardBase
      buttonText="Update Activity"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <TextFormField
        name="title"
        label="Activity Title"
        placeholder="Enter your favorite quote"
        control={control}
        errors={errors}
        maxLength={maxLengths.title}
        shakeRef={titleShake.ref}
      />

      <TextareaFormField
        name="description"
        label="Activity Description"
        placeholder="Quote author"
        control={control}
        errors={errors}
        maxLength={maxLengths.description}
        shakeRef={descriptionShake.ref}
      />

      <ColorFormField
        name="color"
        label="Activity Color"
        control={control}
        errors={errors}
        shakeRef={colorShake.ref}
      />
    </EditCardBase>
  );
}
