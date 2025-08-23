"use client";

import { STEP_ORDER, Step, useStepStore } from "@/lib/stores/step-state";
import styles from "./styles.module.css";

export function DebugPanel() {
  const {
    currentStep,
    visitedSteps,
    canNavigateToStep,
    isStepCompleted,
    goToStep,
    reset,
  } = useStepStore();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className={styles.debugPanel}>
      <h3>Step Debug Panel</h3>
      <div className={styles.info}>
        <p>
          <strong>Current Step:</strong> {currentStep}
        </p>
        <p>
          <strong>Visited Steps:</strong> {Array.from(visitedSteps).join(", ")}
        </p>
      </div>

      <div className={styles.stepGrid}>
        {STEP_ORDER.map((step) => {
          const isCurrent = currentStep === step;
          const isVisited = visitedSteps.has(step);
          const canNavigate = canNavigateToStep(step);
          const isCompleted = isStepCompleted(step);

          return (
            <button
              key={step}
              type="button"
              className={`${styles.stepButton} ${
                isCurrent ? styles.current : ""
              } ${isCompleted ? styles.completed : ""} ${
                canNavigate ? styles.navigable : styles.disabled
              }`}
              onClick={() => goToStep(step)}
              disabled={!canNavigate}
            >
              <div className={styles.stepName}>{step}</div>
              <div className={styles.stepStatus}>
                {isCurrent && "📍 Current"}
                {isCompleted && "✅ Completed"}
                {isVisited && !isCompleted && !isCurrent && "👁️ Visited"}
                {!isVisited && "🔒 Locked"}
              </div>
            </button>
          );
        })}
      </div>

      <button type="button" className={styles.resetButton} onClick={reset}>
        Reset All Steps
      </button>
    </div>
  );
}
