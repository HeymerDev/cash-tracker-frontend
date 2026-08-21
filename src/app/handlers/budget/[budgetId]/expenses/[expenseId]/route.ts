import { verifySession } from "@/dal/auth";

export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } },
) {
  await verifySession();
  const { budgetId, expenseId } = await params;

  return Response.json({ budgetId, expenseId });
}
