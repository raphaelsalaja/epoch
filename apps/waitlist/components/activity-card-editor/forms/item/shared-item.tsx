"use client";

import { motion } from "motion/react";
import { FormProvider } from "react-hook-form";

import {
  ImageFormField,
  TextFormField,
} from "@/components/activity-card-editor/fields";
import { Button } from "@/components/button";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import styles from "../styles.module.css";
import { createUseItemForm } from "./use-item-form";

export function createItemEditor(section: "item_one" | "item_two") {
  const useItemForm = createUseItemForm(section);

  return function EditCardItem() {
    const { setView } = useViewStore();
    const { form, onValid, maxLengths } = useItemForm();
    const { handleSubmit } = form;

    return (
      <FormProvider {...form}>
        <motion.form
          {...viewTransition}
          id={`edit-${section}-form`}
          onSubmit={handleSubmit((values) => {
            onValid(values);
            setView("card");
          })}
          className={styles.form}
        >
          <ImageFormField
            nameColor="color"
            nameIcon="icon"
            label="Item Image"
          />

          <TextFormField
            name="title"
            label="Item Title"
            placeholder="e.g. White Monster"
            maxLength={maxLengths.title}
          />

          <TextFormField
            name="subtitle"
            label="Item Description"
            placeholder="e.g. 4 cans"
            maxLength={maxLengths.subtitle}
          />

          <Button.Root type="submit">
            <Button.Label>Update</Button.Label>
          </Button.Root>
          <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
        </motion.form>
      </FormProvider>
    );
  };
}
