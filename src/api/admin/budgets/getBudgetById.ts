import { getToken } from "@/dal/token";
import { BudgetSchema } from "@/schemas/admin/budget";
import { notFound } from "next/navigation";

export const getBudgetById = async (id: string) => {
  const token = await getToken();

  const request = await fetch(`${process.env.API_URL}/budgets/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!request.ok) {
    notFound();
  }

  try {
    const json = await request.json();
    return BudgetSchema.parse(json);
  } catch (error) {
    console.error(error);
    throw new Error("Error procesando la respuesta");
  }
};
