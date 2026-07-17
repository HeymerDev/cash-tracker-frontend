import { RegisterError } from "@/types/auth/register";

export const hasError = (errors: RegisterError[], field: string) => {
  return errors.some((error) => error.path === field);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
};
