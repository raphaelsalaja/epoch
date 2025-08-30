import type { IconProps } from "../types";

export default function Headphones({ size = 24, title, ...props }: IconProps) {
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
        d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12V13C16.7909 13 15 14.7909 15 17V18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18V12C21 7.36745 17.5 3.55237 13 3.05493V3H12C7.02944 3 3 7.02944 3 12V18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18V17C9 14.7909 7.20914 13 5 13V12Z"
        fill="currentColor"
      />
    </svg>
  );
}
