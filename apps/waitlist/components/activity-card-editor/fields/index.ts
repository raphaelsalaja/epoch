import { ColorFormField } from "./color";
import { ImageFormField } from "./image";
import { TextFormField } from "./text";
import { TextareaFormField } from "./textarea";

export { ColorFormField } from "./color";
export { ImageFormField } from "./image";
export { TextFormField } from "./text";
export { TextareaFormField } from "./textarea";

export const FormField = {
  Color: ColorFormField,
  Image: ImageFormField,
  Text: TextFormField,
  Textarea: TextareaFormField,
};
