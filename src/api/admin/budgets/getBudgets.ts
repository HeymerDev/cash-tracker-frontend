import { BudgetsSchema } from "@/schemas/admin/budget";
import { Budget } from "@/types/admin/budget";
import { cookies } from "next/headers";

export const getBudgets = async (): Promise<Budget[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;

  try {
    const request = await fetch(`${process.env.API_URL}/budgets`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await request.json();

    const budgets: Budget[] = BudgetsSchema.parse(json);

    return budgets;
  } catch (error) {
    console.log(error);
    return [];
  }
};
