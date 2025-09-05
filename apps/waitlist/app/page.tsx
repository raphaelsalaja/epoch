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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "384px" }}>
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
      </div>
    </div>
  );
}
