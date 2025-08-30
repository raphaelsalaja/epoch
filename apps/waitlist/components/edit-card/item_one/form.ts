import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { makeOnInvalid } from "@/lib/hooks/use-invalid-submit-shake";
import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Item>;

export function useItemOneForm() {
  const { card, updateItemOne } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Item),
    defaultValues: {
      title: card.item_one?.title ?? "",
      subtitle: card.item_one?.subtitle ?? "",
      image: card.item_one?.image ?? { color: "blue", icon: "crown" },
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ title, subtitle, image }: FormValues) => {
    const clean = {
      title: (title ?? "").trim(),
      subtitle: (subtitle ?? "").trim(),
      image,
    };
    updateItemOne(clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  const createOnInvalid = (shakeHandlers: {
    title?: () => void;
    subtitle?: () => void;
    image?: () => void;
  }) =>
    makeOnInvalid<FormValues>(form.setFocus, [
      { name: "title", shake: shakeHandlers.title || (() => {}) },
      { name: "subtitle", shake: shakeHandlers.subtitle || (() => {}) },
      { name: "image", shake: shakeHandlers.image || (() => {}) },
    ]);

  return {
    form,
    onValid,
    createOnInvalid,
    maxLengths: {
      title: 100,
      subtitle: 100,
    },
  };
}

export type { FormValues as QuoteFormValues };
