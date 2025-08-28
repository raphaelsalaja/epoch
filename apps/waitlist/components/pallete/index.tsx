import { Toggle } from "@base-ui-components/react/toggle";
import { ToggleGroup } from "@base-ui-components/react/toggle-group";
import type React from "react";
import styles from "./styles.module.css";

const colors = [
  "grey",
  "dark-grey",
  "purple",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
] as const;

interface PaletteProps extends React.ComponentPropsWithRef<typeof ToggleGroup> {
  color?: (typeof colors)[number];
}

const Palette = ({ color = "blue", ...props }: PaletteProps) => {
  return (
    <Toggle
      value={color}
      data-type={color}
      aria-label={color}
      className={styles.color}
      style={{ background: `var(--${color})` }}
    />
  );
};

interface ColorPaletteProps
  extends React.ComponentPropsWithRef<typeof ToggleGroup> {
  kind?: "grid" | "list";
}

export function ColorPalette({ kind = "grid", ...props }: ColorPaletteProps) {
  return (
    <ToggleGroup defaultValue={["red"]} className={styles.pallete}>
      {colors.map((color) => (
        <Palette key={color} color={color} />
      ))}
    </ToggleGroup>
  );
}
