"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ActivityCardEditor } from "@/components/activity-card-editor";

export default function Home() {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.98, opacity: 0, y: 8 }}
        animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { scale: 0.98, opacity: 0, y: 8 }}
        transition={
          reduce
            ? { duration: 0.2 }
            : { type: "spring", bounce: 0.2, duration: 0.3 }
        }
      >
        <ActivityCardEditor />
      </motion.div>
    </AnimatePresence>
  );
}
