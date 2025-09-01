"use client";

import { AnimatePresence } from "motion/react";
import { useViewStore } from "@/lib/stores/view";
import { ActivityCard } from "./activity-card";
import { Forms } from "./forms";
import styles from "./styles.module.css";

export function ActivityCardEditor() {
  const { view } = useViewStore();

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </div>
  );
}
