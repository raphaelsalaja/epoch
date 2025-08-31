import {
  Cookies,
  Crown,
  Cutlery,
  Diamond,
  Drink,
  Explosion,
  Growth,
  Headphones,
  Tablet,
} from "@/components/icons";

import type { IconName } from "../types";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const iconMap = {
    crown: Crown,
    cutlery: Cutlery,
    tablet: Tablet,
    diamond: Diamond,
    headphones: Headphones,
    cookies: Cookies,
    growth: Growth,
    drink: Drink,
    explosion: Explosion,
  } as const;

  const Slot = iconMap[name];

  return <Slot {...props} />;
};
