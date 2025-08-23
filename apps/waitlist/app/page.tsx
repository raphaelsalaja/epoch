"use client";

import React from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Generation } from "@/components/generation";
import { Manifesto } from "@/components/manifesto";
import { Results } from "@/components/results";
import { Step, useStepStore } from "@/lib/stores/step-state";

export default function Home() {
  const currentStep = useStepStore((state) => state.currentStep);

  return (
    <React.Fragment>
      <Breadcrumbs />
      <div>
        {currentStep === Step.Manifesto && <Manifesto />}
        {currentStep === Step.Generation && <Generation />}
        {currentStep === Step.Results && <Results />}
      </div>
    </React.Fragment>
  );
}
