import type { FieldValues } from "react-hook-form";
import type { FieldConfig } from "./fields";

// Template names the editor currently supports
export type TemplateName =
  | "activity"
  | "quote"
  | "item_one"
  | "item_two"
  | "spotify";

export type TemplateConfig<T extends FieldValues> = {
  name: TemplateName;
  fields: FieldConfig<T>[];
};

// This file can hold configuration-only definitions for fields per template.
// It's optional wiring for future scaling; current forms still define their own fields.

export const Templates = {
  // example usage (kept minimal to avoid behavior changes):
  // activity: <TemplateConfig<any>>{
  //   name: "activity",
  //   fields: [
  //     { kind: "text", name: "title" as Path<any>, label: "Activity Title", placeholder: "Enter your favorite quote", maxLength: 100 },
  //     { kind: "textarea", name: "description" as Path<any>, label: "Activity Description", placeholder: "Quote author", maxLength: 150 },
  //     { kind: "color", name: "color" as Path<any>, label: "Activity Color" },
  //   ],
  // },
} as const;
