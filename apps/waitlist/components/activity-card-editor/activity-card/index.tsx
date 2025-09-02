"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { Icon } from "@/components/icons";
import { Spinner } from "@/components/icons/spinner";
import { downloadElementAsImage } from "@/lib/export";
import { spinner, text, viewTransition } from "@/lib/motion";
import { useCardStore } from "@/lib/stores/card";
import { useViewStore } from "@/lib/stores/view";
import styles from "./styles.module.css";

export function ActivityCard() {
  const { card } = useCardStore();
  const { setView } = useViewStore();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  type DownloadState = "idle" | "working" | "done";
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const isWorking = downloadState === "working";
  const isDone = downloadState === "done";

  const onDownload = useCallback(async () => {
    if (!cardRef.current || isWorking) return;

    setDownloadState("working");

    const start = Date.now();
    const minDuration = 2000;

    try {
      await downloadElementAsImage(cardRef.current, {
        filename: "activity-card",
        format: "png",
        background: "auto",
        multiplier: 2,
        maxPixelRatio: 3,
        filter: (n) => {
          if (!(n instanceof HTMLElement)) return true;
          if (n.dataset?.slot === "button") return false;
          if (n.classList.contains("download")) return false;
          return true;
        },
      });

      const elapsed = Date.now() - start;
      if (elapsed < minDuration) {
        await new Promise((r) => setTimeout(r, minDuration - elapsed));
      }

      if (!mountedRef.current) return;
      setDownloadState("done");

      const tid = window.setTimeout(() => {
        if (!mountedRef.current) return;
        setDownloadState("idle");
      }, 1000);

      return () => clearTimeout(tid);
    } catch (err) {
      console.error("Failed to export image", err);
      const elapsed = Date.now() - start;
      if (elapsed < minDuration) {
        await new Promise((r) => setTimeout(r, minDuration - elapsed));
      }
      if (!mountedRef.current) return;
      setDownloadState("idle");
    }
  }, [isWorking]);

  return (
    <motion.div {...viewTransition} className={styles.container}>
      <div
        ref={cardRef}
        className={styles.card}
        style={{ background: `var(--${card.activity.color})` }}
      >
        <button
          tabIndex={0}
          type="button"
          className={styles.activity}
          onClick={() => setView("edit-activity")}
        >
          <h1 className={styles.title}>{card.activity.title}</h1>
          <p className={styles.description}>{card.activity.description}</p>
        </button>
        <div className={styles.items}>
          <button
            type="button"
            className={styles.item}
            onClick={() => setView("edit-spotify")}
          >
            <div className={styles.image}>
              <Image
                width={40}
                height={40}
                src={card.spotify.image}
                alt="Item Image"
                priority={false}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{card.spotify.title}</div>
              <div className={styles.subtitle}>{card.spotify.subtitle}</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setView("edit-item-one")}
            className={styles.item}
          >
            <div className={styles.image}>
              <div className={styles.image}>
                <div
                  className={styles.icon}
                  style={{
                    background: `var(--${card.item_one.color})`,
                    width: 40,
                    height: 40,
                  }}
                >
                  <Icon name={card.item_one.icon} />
                </div>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{card.item_one.title}</div>
              <div className={styles.subtitle}>{card.item_one.subtitle}</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setView("edit-item-two")}
            className={styles.item}
          >
            <div className={styles.image}>
              <div
                className={styles.icon}
                style={{
                  background: `var(--${card.item_two.color})`,
                  width: 40,
                  height: 40,
                }}
              >
                <Icon name={card.item_two.icon} />
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.title}>{card.item_two.title}</div>
              <div className={styles.subtitle}>{card.item_two.subtitle}</div>
            </div>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setView("edit-quote")}
          className={styles.quote}
        >
          <p className={styles.text}>{card.quote.text}</p>
          <p className={styles.author}>by {card.quote.author}</p>
        </button>
      </div>

      <Button.Root
        type="button"
        onClick={onDownload}
        aria-label="Download activity card"
        aria-busy={isWorking}
        disabled={isWorking}
        className="download"
      >
        <Button.Label {...spinner(isWorking)}>
          <Spinner />
        </Button.Label>
        <Button.Label>Download</Button.Label>
        <Button.Label {...text(isWorking)}>ing</Button.Label>
        <Button.Label {...text(isDone)}>ed</Button.Label>
      </Button.Root>
    </motion.div>
  );
}
