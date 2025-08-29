import { useAnimate } from "motion/react";

type ShakeOpts = {
  amplitude?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
};

export function useShake(opts: ShakeOpts = {}) {
  const { amplitude = 6, spring = { stiffness: 200, damping: 2, mass: 0.1 } } =
    opts;
  const [ref, animate] = useAnimate();

  async function trigger() {
    await animate(
      ref.current,
      { x: [-amplitude, 0] },
      { type: "spring", ...spring },
    );
  }

  return { ref, trigger };
}
