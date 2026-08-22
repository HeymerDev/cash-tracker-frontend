import { verifySession } from "@/dal/auth";
import { getToken } from "@/dal/token";
import { ExpenseSchema } from "@/schemas/admin/expense";
import { ResponseSchema } from "@/schemas/auth";

export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } },
) {
  await verifySession();
  const token = await getToken();
  const { budgetId, expenseId } = await params;

  try {
    const req = await fetch(
      `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const json = await req.json();

    if (!req.ok) {
      const { message } = ResponseSchema.parse(json);
      return Response.json({ message }, { status: req.status });
    }

    const expense = ExpenseSchema.parse(json);

    return Response.json(expense, { status: req.status });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to fetch expense" }, { status: 500 });
  }
}
