import { ApiValidationErrorsResponseSchema } from "@/schemas";
import { UserSchema } from "@/schemas/auth";
import { z } from "zod";

export type User = z.infer<typeof UserSchema>;

export type ApiValidationError = z.infer<
  typeof ApiValidationErrorsResponseSchema
>;
