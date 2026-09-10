import { BudgetSchema, BudgetsSchema } from "@/schemas/admin/budget";
import { z } from "zod";

export type CreateBudgetError = {
  path: string;
  message: string;
};

export type DeleteBudgetFields = {
  password: string;
};

export type CreateBudgetFields = {
  name: string;
  amount: number;
};

export type CreateBudgetState = {
  errors: CreateBudgetError[];
  fields: CreateBudgetFields;
  message: string;
  status?: number;
};

export type EditBudgetState = {
  errors: CreateBudgetError[];
  fields: CreateBudgetFields;
  message: string;
  status?: number;
};

export type DeletBudgetState = {
  errors: CreateBudgetError[];
  fields: DeleteBudgetFields;
  message: string;
  status?: number;
  timestamp?: number;
};

export type Budget = z.infer<typeof BudgetSchema>;

/**
 * Presupuesto tal y como lo devuelve el listado (GET /budgets): sin `expenses`.
 * El detalle (GET /budgets/:id) sí los incluye y usa el tipo `Budget`.
 */
export type BudgetSummary = z.infer<typeof BudgetsSchema>[number];
