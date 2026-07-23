import { z } from "zod";

export const ApiValidationErrorSchema = z.object({
  type: z.string(),
  value: z.string(),
  msg: z.string(),
  path: z.string(),
  location: z.string(),
});

export const ApiValidationErrorsResponseSchema = z.object({
  errors: z.array(ApiValidationErrorSchema),
});
