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

interface ColorItemProps {
  color: ColorValue;
}

const ColorItem = ({ color }: ColorItemProps) => {
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

interface ColorPickerProps {
  value?: ColorValue;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}

export function ColorPicker({
  value = "blue",
  onValueChange,
  kind = "list",
  name,
  id,
  ...props
}: ColorPickerProps) {
  return (
    <RadioGroup
      data-kind={kind}
      value={value}
      onValueChange={onValueChange}
      className={styles.picker}
      name={name}
      id={id}
      {...props}
    >
      {colors.map((color) => (
        <ColorItem key={color} color={color} />
      ))}
    </RadioGroup>
  );
}
