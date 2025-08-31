"use client";

import { AnimatePresence, motion } from "motion/react";
import { Manifesto } from "@/components/manifesto";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          scale: 0.98,
          opacity: 0,
          y: 8,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        exit={{
          scale: 0.98,
          opacity: 0,
          y: 8,
        }}
        transition={{
          duration: 0.4,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        <Manifesto />
      </motion.div>
    </AnimatePresence>
  );
}
