import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { Icon } from "@/components/icons";
import { ICON_NAMES, type IconName, type PickerProps } from "@/lib/types";
import styles from "./styles.module.css";

const icons = ICON_NAMES;

interface IconItemProps {
  icon: IconName;
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

interface IconPickerProps extends PickerProps<IconName> {}

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
