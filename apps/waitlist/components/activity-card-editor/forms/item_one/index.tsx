"use client";

import {
  ImageFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";
import styles from "../styles.module.css";
import { useItemOneForm } from "./form";

interface Props {
  onDone?: () => void;
}

export function EditCardItemOne({ onDone }: Props) {
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
    <div className={styles.container}>
      <form
        id="edit-item-one-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          onDone?.();
        }, onInvalid)}
        className={styles.form}
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

        <Button.Root type="submit">
          <Button.Label>Update Item</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </form>
    </div>
  );
}
