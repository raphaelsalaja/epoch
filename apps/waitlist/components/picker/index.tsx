import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

// Color types
export const COLOR_NAMES = [
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

export type ColorName = (typeof COLOR_NAMES)[number];

import {
  Cookies,
  Crown,
  Diamond,
  Drink,
  Explosion,
  ForkKnife,
  Growth,
  Headphones,
  MedicineTablet,
} from "@/components/icons";
// Icon types (importing from the existing types file)
import { ICON_NAMES, type IconName } from "@/components/icons/types";

// Helper function to get icon component from name
const getIconComponent = (iconName: IconName) => {
  const iconMap = {
    crown: Crown,
    forkKnife: ForkKnife,
    MedicineTablet: MedicineTablet,
    diamond: Diamond,
    headphones: Headphones,
    cookies: Cookies,
    growth: Growth,
    drink: Drink,
    explosion: Explosion,
  } as const;

  const IconComponent = iconMap[iconName];
  return <IconComponent />;
};

interface PickerRootProps {
  value?: string;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  variant?: "icon" | "color";
  name?: string;
  id?: string;
  children: ReactNode;
}

function PickerRoot({
  value,
  onValueChange,
  kind = "list",
  variant = "icon",
  name,
  id,
  children,
  ...props
}: PickerRootProps) {
  return (
    <RadioGroup
      data-kind={kind}
      data-variant={variant}
      value={value}
      onValueChange={onValueChange}
      className={styles.picker}
      name={name}
      id={id}
      {...props}
    >
      {children}
    </RadioGroup>
  );
}

interface PickerItemProps {
  value: string;
  children?: ReactNode;
  variant?: "icon" | "color";
  style?: React.CSSProperties;
}

function PickerItem({
  value,
  children,
  variant = "icon",
  style,
}: PickerItemProps) {
  return (
    <Radio.Root
      value={value}
      data-type={value}
      data-variant={variant}
      aria-label={value}
      className={styles.item}
      style={style}
    >
      {children}
    </Radio.Root>
  );
}

// Convenience components for common use cases
interface ColorPickerProps {
  value?: ColorName;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}

function ColorPicker({
  value = "blue",
  onValueChange,
  kind = "list",
  name,
  id,
}: ColorPickerProps) {
  return (
    <PickerRoot
      variant="color"
      value={value}
      onValueChange={onValueChange}
      kind={kind}
      name={name}
      id={id}
    >
      {COLOR_NAMES.map((color) => (
        <PickerItem
          key={color}
          value={color}
          variant="color"
          style={{ background: `var(--${color})` }}
        />
      ))}
    </PickerRoot>
  );
}

interface IconPickerProps {
  value?: IconName;
  onValueChange?: (value: unknown, event: Event) => void;
  kind?: "grid" | "list";
  name?: string;
  id?: string;
}

function IconPicker({
  value = "crown",
  onValueChange,
  kind = "list",
  name,
  id,
}: IconPickerProps) {
  return (
    <PickerRoot
      variant="icon"
      value={value}
      onValueChange={onValueChange}
      kind={kind}
      name={name}
      id={id}
    >
      {ICON_NAMES.map((icon) => (
        <PickerItem key={icon} value={icon} variant="icon">
          {getIconComponent(icon)}
        </PickerItem>
      ))}
    </PickerRoot>
  );
}

export const Picker = {
  Root: PickerRoot,
  Item: PickerItem,
  Color: ColorPicker,
  Icon: IconPicker,
};
