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
          <ActivityCard key="card" />
        ) : view === "edit-activity" ? (
          <Forms.Activity key="edit-activity" />
        ) : view === "edit-spotify" ? (
          <Forms.Spotify key="edit-spotify" />
        ) : view === "edit-item-one" ? (
          <Forms.ItemOne key="edit-item-one" />
        ) : view === "edit-item-two" ? (
          <Forms.ItemTwo key="edit-item-two" />
        ) : view === "edit-quote" ? (
          <Forms.Quote key="edit-quote" />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
