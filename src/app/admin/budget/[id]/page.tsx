import { getBudgetById } from "@/api/admin/budgets/getBudgetById";
import { AddExpenseButton } from "@/components/admin/buttons/AddExpenseButton";
import { GenericDialog } from "@/components/admin/dialogs/GenericDialog";
import { formatCurrency, formatDate } from "@/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const budget = await getBudgetById(id);
  return { title: `${budget.name}` };
}

const BudgetPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const budget = await getBudgetById(id);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mr-16">
          <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
          <p className="text-xl font-bold">
            Administra tus {""} <span className="text-amber-500">gastos</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {budget.expenses.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold text-purple-950 mt-10">Gastos</h1>
          <ul role="list" className="divide-y divide-gray-300 shadow-lg mt-10 ">
            {budget.expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {expense.name}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Agregado el{" "}
                      <span className="font-bold">
                        {formatDate(expense.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-10">
          <p className="text-gray-500 text-lg">
            No hay gastos registrados para este presupuesto.
          </p>
        </div>
      )}

      <GenericDialog />
    </>
  );
};

export default BudgetPage;
