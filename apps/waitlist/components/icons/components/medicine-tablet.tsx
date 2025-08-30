import type { IconProps } from "../types";

export default function MedicineTablet({
  size = 24,
  title,
  ...props
}: IconProps) {
  const a11y = title
    ? { role: "img", "aria-label": title }
    : { "aria-hidden": true };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...a11y}
      {...props}
    >
      <path
        d="M11.0415 4.04346C13.5031 1.58187 17.4941 1.58187 19.9557 4.04346C22.4173 6.50505 22.4173 10.4961 19.9557 12.9577L17.1628 15.7506L8.24861 6.83635L11.0415 4.04346Z"
        fill="currentColor"
      />
      <path
        d="M6.8344 8.25057L4.04151 11.0435C1.57991 13.5051 1.57991 17.4961 4.04151 19.9577C6.5031 22.4193 10.4941 22.4193 12.9557 19.9577L15.7486 17.1648L6.8344 8.25057Z"
        fill="currentColor"
      />
    </svg>
  );
}
