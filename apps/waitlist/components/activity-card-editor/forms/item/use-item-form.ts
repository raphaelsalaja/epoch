import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { makeOnInvalid } from "@/lib/hooks/use-invalid-submit-shake";
import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

export type ItemFormValues = z.infer<typeof Schemas.Item>;

type ItemSection = "item_one" | "item_two";

export function createUseItemForm(section: ItemSection) {
  return function useItemForm() {
    const { card, updateSection } = useCardStore();

    const current = card[section];

    const form = useForm<ItemFormValues>({
      resolver: zodResolver(Schemas.Item),
      defaultValues: {
        title: current?.title ?? "",
        subtitle: current?.subtitle ?? "",
        color: current?.color ?? "blue",
        icon: current?.icon ?? "crown",
      },
      mode: "onSubmit",
      reValidateMode: "onChange",
    });

    const onValid = ({ title, subtitle, color, icon }: ItemFormValues) => {
      const clean = {
        title: (title ?? "").trim(),
        subtitle: (subtitle ?? "").trim(),
        color,
        icon,
      } satisfies ItemFormValues;
      updateSection(section, clean);
      form.reset(clean, { keepDirty: false, keepValues: true });
    };

    const createOnInvalid = (shakeHandlers: {
      title?: () => void;
      subtitle?: () => void;
      image?: () => void;
    }) =>
      makeOnInvalid<ItemFormValues>(form.setFocus, [
        { name: "title", shake: shakeHandlers.title || (() => {}) },
        { name: "subtitle", shake: shakeHandlers.subtitle || (() => {}) },
      ]);

    return {
      form,
      onValid,
      createOnInvalid,
      maxLengths: {
        title: 100,
        subtitle: 100,
      },
    } as const;
  };
}
