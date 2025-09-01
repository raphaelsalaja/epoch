"use client";

import { AnimatePresence, type MotionProps, motion } from "motion/react";
import { Button } from "@/components/button";
import { useViewStore } from "@/lib/stores/view";
import { ActivityCard } from "./activity-card";
import { Forms } from "./forms";
import styles from "./styles.module.css";

const viewTransitions: MotionProps = {
  initial: {
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.98,
    opacity: 0,
  },
  transition: {
    ease: [0.19, 1, 0.22, 1],
    duration: 0.3,
  },
};

export function ActivityCardEditor() {
  const { view } = useViewStore();

  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div key={view} {...viewTransitions}>
          {view === "card" ? (
            <ActivityCard />
          ) : view === "edit-activity" ? (
            <Forms.Activity />
          ) : view === "edit-spotify" ? (
            <Forms.Spotify />
          ) : view === "edit-item-one" ? (
            <Forms.ItemOne />
          ) : view === "edit-item-two" ? (
            <Forms.ItemTwo />
          ) : view === "edit-quote" ? (
            <Forms.Quote />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <Button.Root
        type="submit"
        form={
          view === "edit-activity"
            ? "edit-activity-form"
            : view === "edit-spotify"
              ? "edit-spotify-form"
              : view === "edit-item-one"
                ? "edit-item-one-form"
                : view === "edit-item-two"
                  ? "edit-item-two-form"
                  : view === "edit-quote"
                    ? "edit-quote-form"
                    : undefined
        }
      >
        <Button.Label>
          {view === "edit-activity"
            ? "Update Activity"
            : view === "edit-spotify"
              ? "Update"
              : view === "edit-item-one" || view === "edit-item-two"
                ? "Update Item"
                : view === "edit-quote"
                  ? "Update Quote"
                  : "Submit"}
        </Button.Label>
      </Button.Root>
    </div>
  );
}
