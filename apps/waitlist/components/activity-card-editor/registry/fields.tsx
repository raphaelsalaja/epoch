import type { FieldValues, Path } from "react-hook-form";
import { ColorFormField } from "../fields/color";
import { ImageFormField } from "../fields/image";
import { TextFormField } from "../fields/text";
import { TextareaFormField } from "../fields/textarea";

export type FieldKind = "text" | "textarea" | "color" | "image";

export type FieldConfig<T extends FieldValues> =
  | {
      kind: "text" | "textarea";
      name: Path<T>;
      label: string;
      placeholder: string;
      maxLength: number;
    }
  | { kind: "color"; name: Path<T>; label: string }
  | { kind: "image"; name: Path<T>; label: string }
  | { kind: "image"; nameColor: Path<T>; nameIcon: Path<T>; label: string };

export function RenderField<T extends FieldValues>({
  config,
}: {
  config: FieldConfig<T>;
}) {
  switch (config.kind) {
    case "text":
      return (
        <TextFormField
          name={config.name}
          label={config.label}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
        />
      );
    case "textarea":
      return (
        <TextareaFormField
          name={config.name}
          label={config.label}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
        />
      );
    case "color":
      return <ColorFormField name={config.name} label={config.label} />;
    case "image":
      return "name" in config ? (
        <ImageFormField name={config.name} label={config.label} />
      ) : (
        <ImageFormField
          nameColor={config.nameColor}
          nameIcon={config.nameIcon}
          label={config.label}
        />
      );
    default:
      return null;
  }
}
