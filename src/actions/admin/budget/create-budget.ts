"use server";

import { CreateBudgetSchema } from "@/schemas/admin/budget";
import { ResponseSchema } from "@/schemas/auth";
import { CreateBudgetState } from "@/types/admin/budget";
import { cookies } from "next/headers";

export const createBudget = async (
  prevState: CreateBudgetState,
  formData: FormData,
): Promise<CreateBudgetState> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;

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

  try {
    const request = await fetch(`${process.env.API_URL}/budgets`, {
      method: "POST",
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
