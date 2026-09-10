import { getToken } from "@/dal/token";
import { BudgetsSchema } from "@/schemas/admin/budget";
import { BudgetSummary } from "@/types/admin/budget";

export const getBudgets = async (): Promise<BudgetSummary[]> => {
  const token = await getToken();

  try {
    const request = await fetch(`${process.env.API_URL}/budgets`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await request.json();

    const budgets: BudgetSummary[] = BudgetsSchema.parse(json);

    return budgets;
  } catch (error) {
    console.log(error);
    return [];
  }
};
