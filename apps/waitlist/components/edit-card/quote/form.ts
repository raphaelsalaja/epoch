import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { makeOnInvalid } from "@/lib/hooks/use-invalid-submit-shake";
import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Quote>;

export function useQuoteForm() {
  const { card, updateSection } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Quote),
    defaultValues: {
      text: card.quote.text ?? "",
      author: card.quote.author ?? "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ text, author }: FormValues) => {
    const clean = {
      text: (text ?? "").trim(),
      author: (author ?? "").trim(),
    };
    updateSection("quote", clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  const createOnInvalid = (shakeHandlers: {
    text?: () => void;
    author?: () => void;
  }) =>
    makeOnInvalid<FormValues>(form.setFocus, [
      { name: "text", shake: shakeHandlers.text || (() => {}) },
      { name: "author", shake: shakeHandlers.author || (() => {}) },
    ]);

  return {
    form,
    onValid,
    createOnInvalid,
    maxLengths: {
      text: 150,
      author: 100,
    },
  };
}

export type { FormValues as QuoteFormValues };
