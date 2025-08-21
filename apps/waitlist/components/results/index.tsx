"use client";

import { motion } from "motion/react";
import { Button } from "@/components/button";
import { useGeneration } from "@/lib/stores/generation";
import { useStepStore } from "@/lib/stores/step-state";
import styles from "./styles.module.css";

export function Results() {
  const { name, result, clear } = useGeneration();
  const reset = useStepStore((s) => s.reset);

  if (!name || !result) {
    return null;
  }

  const handleStartOver = () => {
    clear();
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.results}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Thanks, {name}!
      </motion.h2>

      <motion.div
        className={styles.activity}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3>Your workout:</h3>
        <p>{result}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button.Root onClick={handleStartOver} style={{ marginTop: "24px" }}>
          <Button.Label>Start Over</Button.Label>
        </Button.Root>
      </motion.div>
    </motion.div>
  );
}
