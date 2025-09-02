import { useAnimate } from "motion/react";
import { useCallback, useEffect } from "react";
import { useFormState } from "react-hook-form";

type ErrorShakeOpts = {
  amplitude?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  fieldName?: string;
};

export function useErrorShake(opts: ErrorShakeOpts = {}) {
  const {
    amplitude = 6,
    spring = { stiffness: 200, damping: 2, mass: 0.1 },
    fieldName,
  } = opts;
  const [ref, animate] = useAnimate();
  const { errors } = useFormState();

  const trigger = useCallback(async () => {
    if (ref.current) {
      await animate(
        ref.current,
        { x: [-amplitude, 0] },
        { type: "spring", ...spring },
      );
    }
  }, [ref, animate, amplitude, spring]);

  useEffect(() => {
    if (fieldName && errors[fieldName]) {
      trigger();
    }
  }, [errors, fieldName, trigger]);

  return { ref, trigger };
}
