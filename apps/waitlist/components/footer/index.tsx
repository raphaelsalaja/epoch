"use client";

import { Toggle } from "@base-ui-components/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { useSoundController } from "@/lib/sounds";
import { useSettings } from "@/lib/stores/settings";
import { VolumeFull, VolumeMute } from "../icons";
import styles from "./styles.module.css";

const BaseMotionToggle = motion.create(Toggle);

export function Footer() {
  const { isMuted, toggleMute } = useSettings();
  const { play } = useSoundController();

  const handleToggle = useCallback(() => {
    const currentlyMuted = isMuted;
    if (currentlyMuted) {
      play("toggleOn", { ignoreMute: true });
    } else {
      play("toggleOff", { ignoreMute: true });
    }

    toggleMute();
  }, [isMuted, toggleMute, play]);

  const pathname = usePathname();
  if (pathname?.startsWith("/manifesto")) return null;
  return (
    <div className={styles.footer}>
      <ul className={styles.links}>
        <li>
          <Link href="/manifesto">Manifesto</Link>
        </li>
        <li>
          <a
            href="https://x.com/intent/follow?screen_name=raphaelsalaja"
            target="_blank"
            rel="noreferrer"
          >
            X (Twitter)
          </a>
        </li>

        <li>
          <a
            href="https://github.com/raphaelsalaja/epoch"
            target="_blank"
            rel="noreferrer"
          >
            Source Code
          </a>
        </li>

        <li>
          <a
            href="mailto:raphaelsalaja@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </li>
        <li>
          <BaseMotionToggle
            type="button"
            onClick={handleToggle}
            className={styles.toggle}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.1 }}
            pressed={!isMuted}
          >
            <AnimatePresence initial={false} mode="wait">
              {isMuted ? (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.1 }}
                  key="unmute"
                >
                  <VolumeMute size={16} className={styles.icon} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.1 }}
                  key="mute"
                >
                  <VolumeFull size={16} className={styles.icon} />
                </motion.div>
              )}
            </AnimatePresence>
          </BaseMotionToggle>
        </li>
      </ul>
    </div>
  );
}
