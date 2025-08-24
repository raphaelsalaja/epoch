"use client";

import { useGeneratorState } from "../../lib/hooks/use-generator-state";
import { Background, Items, Quote, Summary } from "./components";
import styles from "./styles.module.css";

export function Generator() {
  const { state, updateSummary, updateItem, addItem, removeItem } =
    useGeneratorState();

  return (
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
  );
}
