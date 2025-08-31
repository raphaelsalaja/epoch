"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/button";
import styles from "./styles.module.css";

interface EditCardBaseProps {
  title?: string;
  description?: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}

export function EditCardBase({
  title,
  description,
  buttonText,
  onSubmit,
  children,
}: EditCardBaseProps) {
  return (
    <div className={styles.container}>
      {(title || description) && (
        <div className={styles.text}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      )}

      <form onSubmit={onSubmit} className={styles.form}>
        {children}

        <Button.Root type="submit">
          <Button.Label>{buttonText}</Button.Label>
        </Button.Root>
      </form>
    </div>
  );
}
