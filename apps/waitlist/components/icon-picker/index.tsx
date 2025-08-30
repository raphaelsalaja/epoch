import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { Icon, type IconName } from "@/components/icons";
import styles from "./styles.module.css";

const icons = [
  "crown",
  "forkKnife",
  "medicineTablett",
  "diamond",
  "headphones",
  "cookies",
  "growth",
  "drink",
  "explosion",
] as const;

export type IconValue = IconName;

interface IconItemProps {
  icon: IconValue;
}

const IconItem = ({ icon }: IconItemProps) => {
  return (
    <Radio.Root
      value={icon}
      data-type={icon}
      aria-label={icon}
      className={styles.icon}
    >
      <Icon name={icon} />
    </Radio.Root>
  );
};

interface IconPickerProps {
  value?: IconValue;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}

export function IconPicker({
  value = "crown",
  onValueChange,
  kind = "list",
  name,
  id,
  ...props
}: IconPickerProps) {
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
      {icons.map((icon) => (
        <IconItem key={icon} icon={icon} />
      ))}
    </RadioGroup>
  );
}
