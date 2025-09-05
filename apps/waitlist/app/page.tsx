"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ActivityCardEditor } from "@/components/activity-card-editor";
import { SignUp } from "@/components/sign-up";
import { useTransitionSound } from "@/lib/sounds";
import { useViewStore } from "@/lib/stores/view";

export default function Home() {
  const [proceed, setProceed] = useState(false);
  const play = useTransitionSound();
  const { setView } = useViewStore();
  return (
    <AnimatePresence mode="wait">
      {!proceed ? (
        <SignUp
          onSuccess={() => {
            setProceed(true);
            setView("card");
            play();
          }}
        />
      ) : (
        <ActivityCardEditor />
      )}
    </AnimatePresence>
  );
}
