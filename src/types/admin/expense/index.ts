import { ExpenseSchema } from "@/schemas/admin/expense";
import { z } from "zod";

export type CreateExpenseError = {
  path: string;
  message: string;
};

export type CreateExpenseFields = {
  name: string;
  amount: number;
};

export type CreateExpenseState = {
  errors: CreateExpenseError[];
  fields: CreateExpenseFields;
  message: string;
  status?: number;
};

export type Expense = z.infer<typeof ExpenseSchema>;
