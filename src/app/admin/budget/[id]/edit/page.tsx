import { getBudgetById } from "@/api/admin/budgets/getBudgetById";

const EditBudgetPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const budget = await getBudgetById(id);

  return (
    <div>
      EditBudgetPage <pre>{JSON.stringify(budget, null, 2)}</pre>
    </div>
  );
};

export default EditBudgetPage;
