"use client";

import { Button } from "@/components/button";
import { ImageFormField, TextFormField } from "@/components/edit-card/fields";
import { useShake } from "@/lib/hooks/use-shake";
import { useItemTwoForm } from "./form";
import styles from "./styles.module.css";

export function EditCardItemTwo() {
  const titleShake = useShake();
  const subtitleShake = useShake();
  const imageShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useItemTwoForm();
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
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
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
      </form>
    </div>
  );
}
