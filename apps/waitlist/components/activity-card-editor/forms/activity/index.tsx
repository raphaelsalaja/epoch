"use client";

import { motion } from "motion/react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/button";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import type { FieldConfig } from "../../registry/fields";
import { RenderField } from "../../registry/fields";
import styles from "../styles.module.css";
import type { ActivityFormValues } from "./form";
import { useActivityForm } from "./form";

export function EditCardActivity() {
  const { setView } = useViewStore();
  const { form, onValid, maxLengths } = useActivityForm();
  const { handleSubmit } = form;

  const fields: FieldConfig<ActivityFormValues>[] = [
    {
      kind: "text",
      name: "title",
      label: "Activity Title",
      placeholder: "e.g. John's Run",
      maxLength: maxLengths.title,
    },
    {
      kind: "textarea",
      name: "description",
      label: "Activity Description",
      placeholder: "e.g. Went for a run",
      maxLength: maxLengths.description,
    },
    {
      kind: "color",
      name: "color",
      label: "Activity Color",
    },
  ];

  return (
    <FormProvider {...form}>
      <motion.form
        {...viewTransition}
        id="edit-activity-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          setView("card");
        })}
        className={styles.form}
      >
        {fields.map((config) => {
          const key =
            config.kind === "image"
              ? `image:${"name" in config ? String(config.name) : `${String(config.nameColor)}+${String(config.nameIcon)}`}`
              : `${config.kind}:${String(config.name)}`;

          return <RenderField key={key} config={config} />;
        })}

        <Button.Root type="submit">
          <Button.Label>Update</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </motion.form>
    </FormProvider>
  );
}
