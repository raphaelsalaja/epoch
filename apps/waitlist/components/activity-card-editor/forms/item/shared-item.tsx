"use client";

import { motion } from "motion/react";
import { FormProvider } from "react-hook-form";

import {
  ImageFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import styles from "../styles.module.css";
import { createUseItemForm } from "./use-item-form";

export function createItemEditor(section: "item_one" | "item_two") {
  const useItemForm = createUseItemForm(section);

  return function EditCardItem() {
    const { setView } = useViewStore();
    const titleShake = useShake();
    const subtitleShake = useShake();
    const imageShake = useShake();

    const { form, onValid, createOnInvalid, maxLengths } = useItemForm();
    const { handleSubmit } = form;

    const onInvalid = createOnInvalid({
      title: titleShake.trigger,
      subtitle: subtitleShake.trigger,
      image: imageShake.trigger,
    });

    return (
      <FormProvider {...form}>
        <motion.form
          {...viewTransition}
          id={`edit-${section}-form`}
          onSubmit={handleSubmit((values) => {
            onValid(values);
            setView("card");
          }, onInvalid)}
          className={styles.form}
        >
          <ImageFormField
            nameColor="color"
            nameIcon="icon"
            label="Item Image"
            shakeRef={imageShake.ref}
          />

          <TextFormField
            name="title"
            label="Item Title"
            placeholder="Enter the title"
            maxLength={maxLengths.title}
            shakeRef={titleShake.ref}
          />

          <TextFormField
            name="subtitle"
            label="Item Description"
            placeholder="Enter the description"
            maxLength={maxLengths.subtitle}
            shakeRef={subtitleShake.ref}
          />

          <Button.Root type="submit">
            <Button.Label>Update Item</Button.Label>
          </Button.Root>
          <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
        </motion.form>
      </FormProvider>
    );
  };
}
