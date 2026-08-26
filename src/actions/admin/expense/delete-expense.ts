"use server";

import { getToken } from "@/dal/token";
import { ResponseSchema } from "@/schemas/auth";
import { Budget } from "@/types/admin/budget";
import { DeleteExpenseState, Expense } from "@/types/admin/expense";
import { revalidatePath } from "next/cache";

export const deleteExpense = async (
  budgetId: Budget["id"],
  expenseId: Expense["id"],
  prevState: DeleteExpenseState,
): Promise<DeleteExpenseState> => {
  const token = await getToken();

  try {
    const deleteRequest = await fetch(
      `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const deleteJson = await deleteRequest.json();

    const { message: deleteMessage } = ResponseSchema.parse(deleteJson);
    if (!deleteRequest.ok) {
      return {
        message: deleteMessage,
        status: deleteRequest.status,
      };
    }

    revalidatePath("/admin/budgets");

    return {
      message: deleteMessage,
      status: deleteRequest.status,
    };
  } catch (error) {
    console.error("Error checking password:", error);
    return {
      message: "An error occurred while checking the password.",
    };
  }
};
