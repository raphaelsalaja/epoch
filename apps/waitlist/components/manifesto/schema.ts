import z from "zod";

export const schema = z.object({
  email: z.email("Please enter a valid email address"),
});
