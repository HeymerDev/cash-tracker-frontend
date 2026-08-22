import { ExpenseSchema } from "@/schemas/admin/expense";
import { notFound } from "next/navigation";

export const getExpenseById = async (budgetId: string, expenseId: string) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/handlers/budget/${budgetId}/expenses/${expenseId}`,
  );

  if (!request.ok) {
    notFound();
  }

  try {
    const json = await request.json();
    return ExpenseSchema.parse(json);
  } catch (error) {
    console.error(error);
    throw new Error("Error procesando la respuesta");
  }
};
