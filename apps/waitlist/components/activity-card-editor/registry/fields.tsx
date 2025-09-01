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
  | { kind: "image"; name: Path<T>; label: string };

export function RenderField<T extends FieldValues>({
  config,
  shakeRef,
}: {
  config: FieldConfig<T>;
  shakeRef: React.RefObject<HTMLDivElement>;
}) {
  switch (config.kind) {
    case "text":
      return (
        <TextFormField
          name={config.name}
          label={config.label}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          shakeRef={shakeRef}
        />
      );
    case "textarea":
      return (
        <TextareaFormField
          name={config.name}
          label={config.label}
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          shakeRef={shakeRef}
        />
      );
    case "color":
      return (
        <ColorFormField
          name={config.name}
          label={config.label}
          shakeRef={shakeRef}
        />
      );
    case "image":
      return (
        <ImageFormField
          name={config.name}
          label={config.label}
          shakeRef={shakeRef}
        />
      );
    default:
      return null;
  }
}
