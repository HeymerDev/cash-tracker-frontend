import { getToken } from "@/dal/token";
import { ApiValidationErrorsResponseSchema } from "@/schemas";
import { BudgetSchema } from "@/schemas/admin/budget";
import { ApiValidationError } from "@/types/admin";
import { Budget } from "@/types/admin/budget";

export const getBudgetById = async (id: string) => {
  const token = await getToken();

  try {
    const request = await fetch(`${process.env.API_URL}/budgets/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await request.json();

    if (!request.ok) {
      const validationError: ApiValidationError =
        ApiValidationErrorsResponseSchema.parse(json);

      return validationError.errors[0].msg;
    }

    const budget: Budget = BudgetSchema.parse(json);

    return budget;
  } catch (error) {
    console.log(error);
  }
};
