import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
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

export type ColorValue = (typeof colors)[number];

interface PaletteProps {
  color: ColorValue;
}

const Palette = ({ color }: PaletteProps) => {
  return (
    <Radio.Root
      value={color}
      data-type={color}
      aria-label={color}
      className={styles.color}
      style={{ background: `var(--${color})` }}
    />
  );
};

interface ColorPaletteProps {
  value?: ColorValue;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}

export function ColorPalette({
  value = "blue",
  onValueChange,
  kind = "grid",
  name,
  id,
  ...props
}: ColorPaletteProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={styles.pallete}
      name={name}
      id={id}
      {...props}
    >
      {colors.map((color) => (
        <Palette key={color} color={color} />
      ))}
    </RadioGroup>
  );
}
