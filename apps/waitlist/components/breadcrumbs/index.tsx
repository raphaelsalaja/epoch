"use client";

import { STEP_ORDER, Step, useStepStore } from "@/lib/stores/step-state";
import { Chevron, Customise, Details, Waitlist } from "../icons";
import styles from "./styles.module.css";

const STEP_CONFIG = {
  [Step.Manifesto]: {
    icon: Waitlist,
    label: "Waitlist",
  },
  [Step.Generation]: {
    icon: Details,
    label: "Details",
  },
  [Step.Results]: {
    icon: Customise,
    label: "Customise",
  },
};

export function Breadcrumbs() {
  const { currentStep, goToStep, canNavigateToStep } = useStepStore();

  const handleStepClick = (step: Step) => {
    if (canNavigateToStep(step)) {
      goToStep(step);
    }
  };

  return (
    <div className={styles.breadcrumbs}>
      {STEP_ORDER.map((step, index) => {
        const isCurrentStep = currentStep === step;
        const isNavigable = canNavigateToStep(step);
        const IconComponent = STEP_CONFIG[step].icon;

        return (
          <div key={step} className={styles.stepContainer}>
            <button
              type="button"
              className={`${styles.breadcrumb} ${
                isCurrentStep ? styles.current : ""
              } ${isNavigable ? styles.navigable : styles.disabled}`}
              onClick={() => handleStepClick(step)}
              disabled={!isNavigable}
              aria-current={isCurrentStep ? "page" : undefined}
            >
              <IconComponent />
              <div>{STEP_CONFIG[step].label}</div>
            </button>
            {index < STEP_ORDER.length - 1 && (
              <Chevron className={styles.chevron} />
            )}
          </div>
        );
      })}
    </div>
  );
}
