import { motion } from "motion/react";
import styles from "./styles.module.css";

export function Spinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
      className={styles.spinner}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <circle
          cx="9"
          cy="9"
          r="7"
          stroke="var(--background-primary)"
          strokeOpacity="0.2"
          strokeWidth="2.5"
        />
        <path
          d="M16 9C16 5.13401 12.866 2 9 2"
          stroke="var(--background-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
