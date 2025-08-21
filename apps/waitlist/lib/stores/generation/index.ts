import { create } from "zustand";
import { persist } from "zustand/middleware";

type GenerationState = {
  name?: string;
  result?: string;
  setGeneration: (p: { name: string; result: string }) => void;
  clear: () => void;
};

export const useGeneration = create<GenerationState>()(
  persist(
    (set) => ({
      name: undefined,
      result: undefined,
      setGeneration: (p) => set(p),
      clear: () => set({ name: undefined, result: undefined }),
    }),
    { name: "generation-store" },
  ),
);
