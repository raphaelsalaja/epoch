"use client";

import {
  ColorFormField,
  TextareaFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";

import styles from "../styles.module.css";
import { useActivityForm } from "./form";

interface Props {
  onDone?: () => void;
}

export function EditCardActivity({ onDone }: Props) {
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
    <div className={styles.container}>
      <form
        id="edit-activity-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          onDone?.();
        }, onInvalid)}
        className={styles.form}
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

        <Button.Root type="submit">
          <Button.Label>Update Activity</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </form>
    </div>
  );
}
