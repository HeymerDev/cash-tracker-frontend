import { BudgetSchema } from "@/schemas/admin/budget";
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
