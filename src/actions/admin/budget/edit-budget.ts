"use server";

import { getToken } from "@/dal/token";
import { EditBudgetSchema } from "@/schemas/admin/budget";
import { ResponseSchema } from "@/schemas/auth";
import { Budget, EditBudgetState } from "@/types/admin/budget";

export const editBudget = async (
  id: Budget["id"],
  prevState: EditBudgetState,
  formData: FormData,
): Promise<EditBudgetState> => {
  const token = await getToken();
  const name = formData.get("name") as string;
  const amount = formData.get("amount") as string;

  const budget = EditBudgetSchema.safeParse({
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
        amount: Number(amount),
      },
      message: "",
    };
  }

  try {
    const request = await fetch(`${process.env.API_URL}/budgets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: budget.data.name,
        amount: budget.data.amount,
      }),
    });

    const json = await request.json();

    console.log(json);

    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return {
        errors: [],
        fields: {
          name,
          amount: Number(amount),
        },
        message: message,
        status: request.status,
      };
    }

    return {
      errors: [],
      fields: { name: "", amount: 0 },
      message: message,
      status: request.status,
    };
  } catch (error) {
    console.log("Error:", error); // Log the error to see what went wrong
    return {
      errors: [],
      fields: {
        name,
        amount: Number(amount),
      },
      message: "Error interno del servidor",
      status: 500,
    };
  }
};
