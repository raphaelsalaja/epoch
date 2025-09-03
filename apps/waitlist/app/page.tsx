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
        <motion.div
          key="manifesto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Manifesto onSuccess={() => setProceed(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="editor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ActivityCardEditor />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
