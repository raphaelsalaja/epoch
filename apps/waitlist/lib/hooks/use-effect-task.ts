"use client";

import { Duration, Effect } from "effect";
import { useCallback, useEffect, useRef, useState } from "react";

export type TaskState = "idle" | "working" | "done" | "error";

export type UseEffectTaskOptions = {
  minMs?: number;
  donePulseMs?: number;
  timeoutMs?: number;
  autoResetMs?: number;
};

/**
 * Generic Effect-based task runner with UX affordances:
 * - minimum loading duration to prevent flashes
 * - optional success pulse
 * - hard timeout
 * - safe state updates on unmount
 * - optional auto reset back to idle
 */
export function useEffectTask(opts: UseEffectTaskOptions = {}) {
  const {
    minMs = 800,
    donePulseMs = 0,
    timeoutMs = 10_000,
    autoResetMs,
  } = opts;

  const mounted = useRef(true);
  const [state, setState] = useState<TaskState>("idle");
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const safeSet = useCallback(<T>(setter: (v: T) => void, v: T) => {
    if (mounted.current) setter(v);
  }, []);

  const normalizeError = useCallback((e: unknown): Error => {
    if (e instanceof Error) return e;
    if (typeof e === "string") return new Error(e);
    try {
      return new Error(JSON.stringify(e));
    } catch {
      return new Error("Unknown error");
    }
  }, []);

  const run = useCallback(
    async <T>(fn: () => Promise<T>) => {
      if (state === "working") return;

      safeSet(setError, null);
      safeSet(setState, "working");

      const program = Effect.sleep(Duration.millis(minMs)).pipe(
        Effect.flatMap(() =>
          Effect.tryPromise(async () => {
            try {
              return await fn();
            } catch (e) {
              throw normalizeError(e);
            }
          }),
        ),
        Effect.tap(() => Effect.sync(() => safeSet(setState, "done"))),
        Effect.tap(() =>
          donePulseMs > 0
            ? Effect.sleep(Duration.millis(donePulseMs))
            : Effect.succeed(undefined),
        ),
        Effect.timeoutFail({
          duration: Duration.millis(timeoutMs),
          onTimeout: () => new Error("Operation timed out"),
        }),
        Effect.ensuring(
          Effect.sync(() => {
            if (autoResetMs && mounted.current) {
              setTimeout(() => {
                if (mounted.current) setState("idle");
              }, autoResetMs);
            }
          }),
        ),
        Effect.catchAll((e) =>
          Effect.sync(() => {
            const err = normalizeError(e);
            console.error("Effect task failed:", err);
            safeSet(setError, err);
            safeSet(setState, "error");
            if (autoResetMs) {
              setTimeout(() => {
                if (mounted.current) setState("idle");
              }, autoResetMs);
            }
          }),
        ),
      );

      await Effect.runPromise(program);
    },
    [
      state,
      minMs,
      donePulseMs,
      timeoutMs,
      autoResetMs,
      safeSet,
      normalizeError,
    ],
  );

  return { state, error, run } as const;
}
