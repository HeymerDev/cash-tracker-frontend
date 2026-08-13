import z from "zod";

export const CreateExpenseSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const ExpenseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
  budgetId: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
