"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ActivityCardEditor } from "@/components/activity-card-editor";
import { Manifesto } from "@/components/manifesto";

const STORAGE_KEY = "epoch.waitlist.joined";

export default function Home() {
  const [joined, setJoined] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted state on mount (client only)
  useEffect(() => {
    try {
      const val =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      setJoined(val === "1");
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  const handleSuccess = () => {
    setJoined(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!hydrated) return null;

  return (
    <AnimatePresence mode="wait">
      {!joined ? (
        <motion.div
          key="manifesto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Manifesto onSuccess={handleSuccess} />
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
