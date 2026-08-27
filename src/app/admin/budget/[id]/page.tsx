import { getBudgetById } from "@/api/admin/budgets/getBudgetById";
import { AddExpenseButton } from "@/components/admin/buttons/AddExpenseButton";
import { GenericDialog } from "@/components/admin/dialogs/GenericDialog";
import { Amount } from "@/components/admin/list/Amount";
import { ExpenseLists } from "@/components/admin/list/ExpenseLists";

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

  const totalSpent = budget.expenses.reduce(
    (total, expense) => expense.amount + total,
    0,
  );

  const totalAvailable = Number(budget.amount) - totalSpent;

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

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
        <div>Grafica</div>
        <div className="flex flex-col justify-center items-center md:items-start gap-5">
          <Amount amount={Number(budget.amount)} label="Presupesto" />
          <Amount amount={totalSpent} label="Gastado" />
          <Amount amount={totalAvailable} label="Disponible" />
        </div>
      </div>

      <ExpenseLists expenses={budget.expenses} />

      <GenericDialog />
    </>
  );
};

export default BudgetPage;
