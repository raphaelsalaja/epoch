"use client";

import { useState } from "react";
import type { GeneratorSummary } from "../../../../lib/hooks/use-generator-state";
import styles from "./styles.module.css";

interface SummaryProps {
  summary: GeneratorSummary;
  onUpdate: (summary: Partial<GeneratorSummary>) => void;
}

export function Summary({ summary, onUpdate }: SummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(summary);

  const handleSave = () => {
    onUpdate(editValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues(summary);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <div className={styles.summary}>
        <input
          type="text"
          value={editValues.title}
          onChange={(e) =>
            setEditValues((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          className={styles.titleInput}
        />
        <textarea
          value={editValues.description}
          onChange={(e) =>
            setEditValues((prev) => ({ ...prev, description: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          className={styles.descriptionInput}
          rows={3}
        />
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleSave}
            className={styles.saveButton}
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.summary}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
    >
      <h1>{summary.title}</h1>
      <p>{summary.description}</p>
    </button>
  );
}
