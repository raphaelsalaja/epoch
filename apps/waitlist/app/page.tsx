"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ActivityCardEditor } from "@/components/activity-card-editor";
import { SignUp } from "@/components/sign-up";

export default function Home() {
  const [proceed, setProceed] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!proceed ? (
        <SignUp onSuccess={() => setProceed(true)} />
      ) : (
        <ActivityCardEditor />
      )}
    </AnimatePresence>
  );
}
