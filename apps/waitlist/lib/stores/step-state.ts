import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Step {
  Manifesto = "manifesto",
  Generation = "generation",
  Results = "results",
}

// Define the step order for navigation
export const STEP_ORDER: Step[] = [
  Step.Manifesto,
  Step.Generation,
  Step.Results,
];

type StepState = {
  currentStep: Step;
  visitedSteps: Set<Step>;
  email?: string;
  setCurrentStep: (step: Step) => void;
  setEmail: (email: string) => void;
  nextStep: () => void;
  goToStep: (step: Step) => void;
  canNavigateToStep: (step: Step) => boolean;
  isStepCompleted: (step: Step) => boolean;
  markStepCompleted: (step: Step) => void;
  reset: () => void;
};

export const useStepStore = create<StepState>()(
  persist(
    (set, get) => ({
      currentStep: Step.Manifesto,
      visitedSteps: new Set([Step.Manifesto]),
      email: undefined,
      setCurrentStep: (step) => {
        const { visitedSteps } = get();
        const newVisitedSteps = new Set(visitedSteps);
        newVisitedSteps.add(step);
        set({ currentStep: step, visitedSteps: newVisitedSteps });
      },
      setEmail: (email) => set({ email }),
      nextStep: () => {
        const { currentStep, visitedSteps } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        if (currentIndex < STEP_ORDER.length - 1) {
          const nextStep = STEP_ORDER[currentIndex + 1];
          const newVisitedSteps = new Set(visitedSteps);
          newVisitedSteps.add(nextStep);
          set({ currentStep: nextStep, visitedSteps: newVisitedSteps });
        }
      },
      goToStep: (step) => {
        const { canNavigateToStep } = get();
        if (canNavigateToStep(step)) {
          set({ currentStep: step });
        }
      },
      canNavigateToStep: (step) => {
        const { visitedSteps } = get();
        return visitedSteps.has(step);
      },
      isStepCompleted: (step) => {
        const { visitedSteps, currentStep } = get();
        const currentIndex = STEP_ORDER.indexOf(currentStep);
        const stepIndex = STEP_ORDER.indexOf(step);
        return visitedSteps.has(step) && stepIndex < currentIndex;
      },
      markStepCompleted: (step) => {
        const { visitedSteps } = get();
        const newVisitedSteps = new Set(visitedSteps);
        newVisitedSteps.add(step);
        set({ visitedSteps: newVisitedSteps });
      },
      reset: () =>
        set({
          currentStep: Step.Manifesto,
          visitedSteps: new Set([Step.Manifesto]),
          email: undefined,
        }),
    }),
    {
      name: "step-store",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              visitedSteps: new Set(
                parsed.state?.visitedSteps || [Step.Manifesto],
              ),
            },
          };
        },
        setItem: (name, value) => {
          const serialized = JSON.stringify({
            ...value,
            state: {
              ...value.state,
              visitedSteps: Array.from(value.state.visitedSteps),
            },
          });
          localStorage.setItem(name, serialized);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
