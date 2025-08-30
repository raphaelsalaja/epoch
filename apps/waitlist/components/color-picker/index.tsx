import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { COLOR_NAMES, type ColorName, type PickerProps } from "@/lib/types";
import styles from "./styles.module.css";

const colors = COLOR_NAMES;

interface ColorItemProps {
  color: ColorName;
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

interface ColorPickerProps extends PickerProps<ColorName> {}

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
