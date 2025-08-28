"use client";

import { AnimatePresence, motion } from "motion/react";
import { Generator } from "@/components/generator";
import { Manifesto } from "@/components/manifesto";
import { Step, useStepStore } from "@/lib/stores/step-state";

export default function Home() {
  const currentStep = useStepStore((state) => state.currentStep);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          scale: 0.98,
          opacity: 0,
          y: 8,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.98,
          opacity: 0,
          y: 8,
        }}
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
        key={currentStep}
      >
        {currentStep === Step.Manifesto && <Manifesto />}
        {currentStep !== Step.Manifesto && <Generator />}
      </motion.div>
    </AnimatePresence>
  );
}
