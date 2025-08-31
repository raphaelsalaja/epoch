import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup } from "@base-ui-components/react/radio-group";
import { forwardRef } from "react";
import { ICON_NAMES } from "@/components/icons/types";
import { Icon } from "../icons/helpers";
import styles from "./styles.module.css";
import {
  COLOR_NAMES,
  type ColorPickerProps,
  type IconPickerProps,
  type PickerItemProps,
  type PickerRootProps,
} from "./types";

function PickerRoot({
  value,
  onValueChange,
  kind = "list",
  variant = "icon",
  name,
  id,
  children,
  cols,
  className,
  style,
  ...props
}: PickerRootProps) {
  return (
    <RadioGroup
      data-kind={kind}
      data-variant={variant}
      value={value}
      onValueChange={
        onValueChange as ((value: unknown, event: Event) => void) | undefined
      }
      className={`${styles.picker} ${className ?? ""}`}
      name={name}
      id={id}
      style={{
        ...(style ?? {}),
        ...(cols ? { "--picker-grid-cols": cols } : null),
      }}
      {...props}
    >
      {children}
    </RadioGroup>
  );
}

const PickerItem = forwardRef<HTMLButtonElement, PickerItemProps>(
  (
    {
      value,
      children,
      variant = "icon",
      title,
      "aria-label": ariaLabel,
      disabled,
      style,
      className,
    },
    ref
  ) => {
    const label = ariaLabel ?? title ?? value;
    return (
      <Radio.Root
        ref={ref}
        value={value}
        data-type={value}
        data-variant={variant}
        aria-label={label}
        title={title}
        disabled={disabled}
        className={`${styles.item} ${className ?? ""}`}
        style={style}
      >
        {children}
      </Radio.Root>
    );
  }
);
PickerItem.displayName = "PickerItem";

function ColorPicker({
  value = "blue",
  onValueChange,
  kind = "list",
  name,
  id,
  cols,
}: ColorPickerProps) {
  return (
    <PickerRoot
      variant="color"
      value={value}
      onValueChange={onValueChange}
      kind={kind}
      name={name}
      id={id}
      cols={cols}
    >
      {COLOR_NAMES.map((color) => (
        <PickerItem
          key={color}
          value={color}
          variant="color"
          style={{
            "--swatch": `var(--${color})`,
            background: "var(--swatch)",
          }}
          aria-label={color}
          title={color}
        />
      ))}
    </PickerRoot>
  );
}

function IconPicker({
  value = "crown",
  onValueChange,
  kind = "list",
  name,
  id,
  cols,
}: IconPickerProps) {
  return (
    <PickerRoot
      variant="icon"
      value={value}
      onValueChange={onValueChange}
      kind={kind}
      name={name}
      id={id}
      cols={cols}
    >
      {ICON_NAMES.map((icon) => (
        <PickerItem
          key={icon}
          value={icon}
          variant="icon"
          aria-label={icon}
          title={icon}
        >
          <Icon name={icon} />
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

export type { ColorName } from "./types";

export { COLOR_NAMES } from "./types";
