"use client";

import { Button } from "@/components/button";
import {
  Background,
  Items,
  Quote,
  Summary,
} from "@/components/generator/components";
import { useGeneratorState } from "@/lib/hooks/use-generator-state";
import styles from "./styles.module.css";

export function Generator() {
  const { state, updateSummary, updateItem, addItem, removeItem } =
    useGeneratorState();

  return (
    <div className={styles.container}>
      <div className={styles.shareable}>
        <Background />
        <Summary summary={state.summary} onUpdate={updateSummary} />
        <Items
          items={state.items}
          onUpdateItem={updateItem}
          onAddItem={addItem}
          onRemoveItem={removeItem}
        />
        <Quote />
      </div>

      <Button.Root type="submit" style={{ width: "100%" }} layout>
        Download
      </Button.Root>
    </div>
  );
}
