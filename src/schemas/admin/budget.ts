import { z } from "zod";
import { ExpenseSchema } from "./expense";

export const CreateBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const EditBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "El password es obligatorio para esta accion" });

export const BudgetSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
  expenses: z.array(ExpenseSchema),
});

export const BudgetsSchema = z.array(BudgetSchema);
