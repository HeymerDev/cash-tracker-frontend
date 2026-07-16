import { z } from "zod";

export const CreateBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const BudgetSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const BudgetsSchema = z.array(BudgetSchema);
