import { Button } from "@/components/button";
import { Field } from "@/components/field";

import styles from "./styles.module.css";

export function Manifesto() {
  return (
    <div className={styles.manifesto}>
      <h1>Epoch</h1>
      <p>
        Most fitness apps stop at sets and reps. They capture the effort of a
        day but lose the thread of months. The industry thrives on complexity
        and distraction.
      </p>
      <p>
        We choose clarity. Training as a long arc of intention, not scattered
        logs. Every session connected across days, weeks, and seasons.
      </p>
      <p className={styles.paragraph}>A system built for progress.</p>
      <Field.Root>
        <Field.Control
          required
          spellCheck={false}
          autoComplete="off"
          placeholder="Email"
        />
      </Field.Root>
      <Button.Root>
        <Button.Label>Join Waitlist</Button.Label>
      </Button.Root>
    </div>
  );
}
