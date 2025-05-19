import { z } from "zod";

const bookValidator = z.object({
  title: z.string().min(1),
  year: z.coerce.number().min(-500).max(2050),
});

const ratingValidator = z.object({
  rating: z.coerce.number().min(1).max(5),
  feedback: z.string().optional(),
});

export { bookValidator, ratingValidator };
