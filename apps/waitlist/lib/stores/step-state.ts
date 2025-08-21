import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Step {
  Manifesto = "manifesto",
  Generation = "generation",
  Results = "results",
}

type StepState = {
  currentStep: Step;
  email?: string;
  setCurrentStep: (step: Step) => void;
  setEmail: (email: string) => void;
  nextStep: () => void;
  reset: () => void;
};

export const useStepStore = create<StepState>()(
  persist(
    (set, get) => ({
      currentStep: Step.Manifesto,
      email: undefined,
      setCurrentStep: (step) => set({ currentStep: step }),
      setEmail: (email) => set({ email }),
      nextStep: () => {
        const { currentStep } = get();
        switch (currentStep) {
          case Step.Manifesto:
            set({ currentStep: Step.Generation });
            break;
          case Step.Generation:
            set({ currentStep: Step.Results });
            break;
          case Step.Results:
            // Stay on results or reset if needed
            break;
        }
      },
      reset: () =>
        set({
          currentStep: Step.Manifesto,
          email: undefined,
        }),
    }),
    { name: "step-store" },
  ),
);
