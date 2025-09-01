"use client";

import { motion } from "motion/react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/button";
import { useShake } from "@/lib/hooks/use-shake";
import { viewTransition } from "@/lib/motion";
import { useViewStore } from "@/lib/stores/view";
import type { FieldConfig } from "../../registry/fields";
import { RenderField } from "../../registry/fields";
import styles from "../styles.module.css";
import type { ActivityFormValues } from "./form";
import { useActivityForm } from "./form";

export function EditCardActivity() {
  const { setView } = useViewStore();
  const titleShake = useShake();
  const descriptionShake = useShake();
  const colorShake = useShake();

  const { form, onValid, createOnInvalid, maxLengths } = useActivityForm();
  const { handleSubmit } = form;

  const onInvalid = createOnInvalid({
    title: titleShake.trigger,
    description: descriptionShake.trigger,
    color: colorShake.trigger,
  });

  const fields: FieldConfig<ActivityFormValues>[] = [
    {
      kind: "text",
      name: "title",
      label: "Activity Title",
      placeholder: "Enter your favorite quote",
      maxLength: maxLengths.title,
    },
    {
      kind: "textarea",
      name: "description",
      label: "Activity Description",
      placeholder: "Quote author",
      maxLength: maxLengths.description,
    },
    {
      kind: "color",
      name: "color",
      label: "Activity Color",
    },
  ];

  const shakeRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    title: titleShake.ref,
    description: descriptionShake.ref,
    color: colorShake.ref,
  };

  return (
    <FormProvider {...form}>
      <motion.form
        {...viewTransition}
        id="edit-activity-form"
        onSubmit={handleSubmit((values) => {
          onValid(values);
          setView("card");
        }, onInvalid)}
        className={styles.form}
      >
        {fields.map((config) => (
          <RenderField
            // eslint-disable-next-line react/no-array-index-key
            key={`${config.kind}:${String(config.name)}`}
            config={config}
            shakeRef={shakeRefs[String(config.name)]}
          />
        ))}

        <Button.Root type="submit">
          <Button.Label>Update Activity</Button.Label>
        </Button.Root>
        <button type="submit" hidden aria-hidden="true" tabIndex={-1} />
      </motion.form>
    </FormProvider>
  );
}
