import { z } from "zod";
import { ICON_NAMES } from "@/components/icons/types";
import { COLOR_NAMES } from "@/components/picker";

const RequiredText = (label: string, max: number) =>
  z
    .string()
    .transform((s) => s.trim())
    .refine((s) => s.length >= 2, {
      message: `${label} must be at least 2 non-space characters`,
    })
    .refine((s) => s.length <= max, {
      message: `${label} cannot be longer than ${max} characters`,
    });

const SignUp = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const Activity = z.object({
  title: RequiredText("Title", 100),
  description: RequiredText("Description", 150),
  color: z.enum(COLOR_NAMES),
});

const Item = z.object({
  title: RequiredText("Title", 100),
  subtitle: RequiredText("Subtitle", 100),
  color: z.enum(COLOR_NAMES),
  icon: z.enum(ICON_NAMES),
});

const Spotify = z.object({
  title: z.string(),
  subtitle: z.string(),
  image: z.url(),
});

const Quote = z.object({
  text: RequiredText("Quote", 150),
  author: RequiredText("Author name", 100),
});

const Summary = z.object({
  text: RequiredText("Summary", 500),
});

const Card = z.object({
  activity: Activity,
  spotify: Spotify,
  item_one: Item,
  item_two: Item,
  quote: Quote,
  summary: Summary,
});

export const Schemas = {
  SignUp,
  Item,
  Activity,
  Spotify,
  Quote,
  Summary,
  Card,
};
