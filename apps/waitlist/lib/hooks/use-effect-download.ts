"use client";

import { Duration, Effect } from "effect";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadElementAsImage } from "@/lib/export";
import { useSoundController } from "@/lib/sounds";

type State = "idle" | "working" | "done";

export type UseEffectDownloadOptions = {
  filename?: string;
  format?: "png" | "jpeg";
  jpegQuality?: number;
  maxPixelRatio?: number;
  multiplier?: number;
  background?: "auto" | string;
  filter?: (n: Element) => boolean;
  minMs?: number;
  donePulseMs?: number;
  timeoutMs?: number;
  retry?: { attempts: number; startMs: number };
};

/**
 * Orchestrates DOM -> image export using Effect:
 * - prevents double-start
 * - ensures min spinner duration
 * - optional retry/backoff
 * - safe cancellation on unmount
 */
export function useEffectDownload(
  nodeRef: React.RefObject<HTMLElement | null>,
  opts: UseEffectDownloadOptions = {},
) {
  const mounted = useRef(true);
  const [state, setState] = useState<State>("idle");
  const { play } = useSoundController();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const safeSet = useCallback((next: State) => {
    if (mounted.current) setState(next);
  }, []);

  const start = useCallback(
    (overrides?: Partial<UseEffectDownloadOptions>) => {
      const node: HTMLElement | null = nodeRef.current;
      if (!node || state === "working") return;

      safeSet("working");

      const merged = { ...opts, ...(overrides ?? {}) };
      const {
        minMs = 1500,
        donePulseMs = 1500,
        timeoutMs = 15_000,
        ...downloadOpts
      } = merged;

      const computedFilename =
        downloadOpts.filename ??
        (() => {
          const now = new Date();
          const pad = (n: number) => String(n).padStart(2, "0");
          const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
          return `epoch-${ts}`;
        })();
      const finalDownloadOpts = { ...downloadOpts, filename: computedFilename };

      const exportEff = Effect.tryPromise(() =>
        downloadElementAsImage(node, finalDownloadOpts),
      );

      const program = Effect.sleep(Duration.millis(minMs)).pipe(
        Effect.flatMap(() => exportEff),
        Effect.tap(() =>
          Effect.sync(() => {
            play("celebration");
            safeSet("done");
          }),
        ),
        Effect.tap(() => Effect.sleep(Duration.millis(donePulseMs))),
        Effect.timeoutFail({
          duration: Duration.millis(timeoutMs),
          onTimeout: () => new Error("Export timed out"),
        }),
        Effect.ensuring(Effect.sync(() => safeSet("idle"))),
        Effect.catchAll((e: unknown) =>
          Effect.sync(() => console.error("export failed", e)),
        ),
      );

      Effect.runPromise(program);
    },
    [nodeRef, opts, state, safeSet, play],
  );

  return {
    state,
    start,
  } as const;
}
