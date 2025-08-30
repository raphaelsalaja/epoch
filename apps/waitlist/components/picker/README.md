# Picker Component

A unified picker component with a Radix-style compound API for selecting colors and icons.

## API

The picker component follows a compound component pattern similar to Radix UI components:

### Basic Usage

```tsx
import { Picker } from "@/components/picker";

// Custom picker using Root and Item
<Picker.Root variant="color" value="blue" onValueChange={handleChange}>
  <Picker.Item value="red" style={{ background: "var(--red)" }} />
  <Picker.Item value="blue" style={{ background: "var(--blue)" }} />
  <Picker.Item value="green" style={{ background: "var(--green)" }} />
</Picker.Root>

// Icon picker
<Picker.Root variant="icon" value="crown" onValueChange={handleChange}>
  <Picker.Item value="crown">
    <Crown />
  </Picker.Item>
  <Picker.Item value="diamond">
    <Diamond />
  </Picker.Item>
</Picker.Root>
```

### Convenience Components

For common use cases, convenience components are provided:

```tsx
// Color picker
<Picker.Color 
  value="blue" 
  onValueChange={handleChange}
  kind="grid" 
/>

// Icon picker
<Picker.Icon 
  value="crown" 
  onValueChange={handleChange}
  kind="list"
/>
```

## Props

### Picker.Root

- `value?: string` - Current selected value
- `onValueChange?: (value: unknown, event: Event) => void` - Change handler
- `kind?: "grid" | "list"` - Layout style (default: "list")
- `variant?: "icon" | "color"` - Visual variant (default: "icon")
- `name?: string` - Form name attribute
- `id?: string` - Form id attribute

### Picker.Item

- `value: string` - Value for this item
- `children?: ReactNode` - Content to display
- `variant?: "icon" | "color"` - Visual variant (default: "icon")
- `style?: React.CSSProperties` - Custom styles

### Picker.Color

- `value?: ColorName` - Selected color (default: "blue")
- `onValueChange?: (value: unknown, event: Event) => void` - Change handler
- `kind?: "grid" | "list"` - Layout style (default: "list")
- `name?: string` - Form name attribute
- `id?: string` - Form id attribute

### Picker.Icon

- `value?: IconName` - Selected icon (default: "crown")
- `onValueChange?: (value: unknown, event: Event) => void` - Change handler
- `kind?: "grid" | "list"` - Layout style (default: "list")
- `name?: string` - Form name attribute
- `id?: string` - Form id attribute

## Types

The component exports the following types:

- `ColorName` - Union of available color names
- `COLOR_NAMES` - Array of available color names

Icon types are imported from `@/components/icons/types`.

## Styling

The component uses CSS modules with data attributes for styling:

- `[data-kind="list"]` / `[data-kind="grid"]` - Layout styles
- `[data-variant="icon"]` / `[data-variant="color"]` - Variant styles
- `[data-state="checked"]` - Selected state styles
