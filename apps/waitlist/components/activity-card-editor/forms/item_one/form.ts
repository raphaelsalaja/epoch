import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Item>;

export function useItemOneForm() {
  const { card, updateSection } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Item),
    defaultValues: {
      title: card.item_one?.title ?? "",
      subtitle: card.item_one?.subtitle ?? "",
      color: card.item_one?.color ?? "blue",
      icon: card.item_one?.icon ?? "crown",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ title, subtitle, color, icon }: FormValues) => {
    const clean = {
      title: (title ?? "").trim(),
      subtitle: (subtitle ?? "").trim(),
      color,
      icon,
    };
    updateSection("item_one", clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  return {
    form,
    onValid,
    maxLengths: {
      title: 100,
      subtitle: 100,
    },
  };
}

export type { FormValues as ItemTwoFormValues };
