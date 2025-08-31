"use client";

import { Button } from "@/components/button";
import {
  ColorFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/edit-card/fields";
import { useShake } from "@/lib/hooks/use-shake";
import { useActivityForm } from "./form";
import styles from "./styles.module.css";

export function EditCardActivity() {
  const textShake = useShake();
  const descriptionShake = useShake();
  const colorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useActivityForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onInvalid = createOnInvalid({
    title: textShake.trigger,
    description: descriptionShake.trigger,
    color: colorShake.trigger,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={styles.form}>
        <TextFormField
          name="title"
          label="Activity Title"
          placeholder="Enter your favorite quote"
          control={control}
          errors={errors}
          maxLength={maxLengths.title}
          shakeRef={textShake.ref}
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

        <Button.Root type="submit">
          <Button.Label>Update Activity</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
