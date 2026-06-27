import { z } from "zod";
import { LoginResponseSchema } from "@/schemas/auth";

export type LoginError = {
  path: string;
  message: string;
};

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type LoginFields = {
  email: string;
};

export type LoginState = {
  errors: LoginError[];
  fields: LoginFields;
  response?: LoginResponse;
  status?: number;
};
