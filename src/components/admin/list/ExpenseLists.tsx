import { Expense } from "@/types/admin/expense";
import { ExpenseCard } from "../cards/ExpenseCard";

interface Props {
  expenses: Expense[];
}

export const ExpenseLists = ({ expenses }: Props) => {
  return (
    <>
      {expenses.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-purple-950 mt-10">Gastos</h2>
          <ul role="list" className="divide-y divide-gray-300 shadow-lg mt-10 ">
            {expenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
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
    </>
  );
};
