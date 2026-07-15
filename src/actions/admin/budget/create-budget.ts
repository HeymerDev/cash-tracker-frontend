"use server";

import { CreateBudgetSchema } from "@/schemas/admin/budget";
import { CreateBudgetState } from "@/types/admin/budget";

export const createBudget = async (
  prevState: CreateBudgetState,
  formData: FormData,
) => {
  const name = formData.get("name") as string;
  const amount = parseFloat(formData.get("amount") as string);

  const budget = CreateBudgetSchema.safeParse({
    name,
    amount,
  });

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        name,
        amount,
      },
      message: "",
    };
  }

  console.log(budget.data);

  return {
    errors: [],
    fields: { name: "", amount: 0 },
    message: "",
  };
};
