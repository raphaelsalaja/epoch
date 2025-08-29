// lib/hooks/use-invalid-submit-shake.ts
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetFocus,
} from "react-hook-form";

type Item<T extends FieldValues> = {
  name: Path<T>;
  shake: () => Promise<void> | void;
};

export function makeOnInvalid<T extends FieldValues>(
  setFocus: UseFormSetFocus<T>,
  order: Array<Item<T>>,
) {
  return async (errors: FieldErrors<T>) => {
    let focused = false;
    const shakes: Array<Promise<void> | void> = [];

    for (const { name, shake } of order) {
      if (errors[name]) {
        if (!focused) {
          setFocus(name);
          focused = true;
        }
        shakes.push(shake());
      }
    }

    await Promise.all(shakes);
  };
}
