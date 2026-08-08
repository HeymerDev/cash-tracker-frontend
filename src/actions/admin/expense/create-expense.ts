"use server";

import { getToken } from "@/dal/token";
import { CreateExpenseSchema } from "@/schemas/admin/expense";
import { ResponseSchema } from "@/schemas/auth";
import { CreateExpenseState } from "@/types/admin/expense";

export const createExpense = async (
  budgetId: string,
  prevState: CreateExpenseState,
  formData: FormData,
): Promise<CreateExpenseState> => {
  const token = await getToken();

  console.log(budgetId);

  const name = formData.get("name") as string;
  const amount = parseFloat(formData.get("amount") as string);

  const expense = CreateExpenseSchema.safeParse({
    name,
    amount,
  });

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((error) => ({
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

  try {
    const request = await fetch(
      `${process.env.API_URL}/budgets/${budgetId}/expenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: expense.data.name,
          amount: expense.data.amount,
        }),
      },
    );

    const json = await request.json();

    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return {
        errors: [],
        fields: {
          name,
          amount,
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
        amount,
      },
      message: "Error interno del servidor",
      status: 500,
    };
  }
};
