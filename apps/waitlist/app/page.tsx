"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ActivityCardEditor } from "@/components/activity-card-editor";
import { SignUp } from "@/components/sign-up";
import { useViewSwitcher } from "@/lib/stores/view";

export default function Home() {
  const [proceed, setProceed] = useState(false);
  const { setView } = useViewSwitcher();

  return (
    <AnimatePresence mode="wait">
      {!proceed ? (
        <SignUp
          onSuccess={() => {
            setProceed(true);
            setView("card");
          }}
        />
      ) : (
        <ActivityCardEditor />
      )}
    </AnimatePresence>
  );
}
