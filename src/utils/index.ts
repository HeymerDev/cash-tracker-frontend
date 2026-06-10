import { RegisterError } from "@/types/auth/register";

export const hasError = (errors: RegisterError[], field: string) => {
  return errors.some((error) => error.path === field);
};
