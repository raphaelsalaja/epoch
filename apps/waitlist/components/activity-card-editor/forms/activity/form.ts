import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Activity>;

export function useActivityForm() {
  const { card, updateSection } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Activity),
    defaultValues: {
      title: card.activity.title ?? "",
      description: card.activity.description ?? "",
      color: card.activity.color ?? "blue",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ title, description, color }: FormValues) => {
    const clean = {
      title: (title ?? "").trim(),
      description: (description ?? "").trim(),
      color,
    };
    updateSection("activity", clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  return {
    form,
    onValid,
    maxLengths: {
      title: 100,
      description: 150,
    },
  };
}

export type { FormValues as ActivityFormValues };
