"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ActivityCardEditor } from "@/components/activity-card-editor";
import { Manifesto } from "@/components/manifesto";

export default function Home() {
  const [proceed, setProceed] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!proceed ? (
        <Manifesto onSuccess={() => setProceed(true)} />
      ) : (
        <ActivityCardEditor />
      )}
    </AnimatePresence>
  );
}
