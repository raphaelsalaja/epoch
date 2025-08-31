import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { makeOnInvalid } from "@/lib/hooks/use-invalid-submit-shake";
import { Schemas } from "@/lib/schemas";
import { useCardStore } from "@/lib/stores/card";

type FormValues = z.infer<typeof Schemas.Summary>;

export function useSummaryForm() {
  const { card, updateSummary } = useCardStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schemas.Summary),
    defaultValues: {
      text: card.summary?.text ?? "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onValid = ({ text }: FormValues) => {
    const clean = {
      text: (text ?? "").trim(),
    };
    updateSummary(clean);
    form.reset(clean, { keepDirty: false, keepValues: true });
  };

  const createOnInvalid = (shakeHandlers: { text?: () => void }) =>
    makeOnInvalid<FormValues>(form.setFocus, [
      { name: "text", shake: shakeHandlers.text || (() => {}) },
    ]);

  return {
    form,
    onValid,
    createOnInvalid,
    maxLengths: {
      text: 500,
    },
  };
}

export type { FormValues as SummaryFormValues };
