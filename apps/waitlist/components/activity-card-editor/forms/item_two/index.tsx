"use client";

import { motion } from "motion/react";
import {
  ImageFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import styles from "../styles.module.css";
import { useItemTwoForm } from "./form";

export function EditCardItemTwo() {
  const { setView } = useViewStore();
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
    <motion.form
      {...viewTransition}
      id="edit-item-two-form"
      onSubmit={handleSubmit((values) => {
        onValid(values);
        setView("card");
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
    </motion.form>
  );
}
