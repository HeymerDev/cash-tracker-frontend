import { Expense } from "@/types/admin/expense";
import { formatCurrency, formatDate } from "@/utils";

interface Props {
  expense: Expense;
}

export const ExpenseCard = ({ expense }: Props) => {
  return (
    <li key={expense.id} className="flex justify-between gap-x-6 p-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <p className="text-2xl font-semibold text-gray-900">{expense.name}</p>
          <p className="text-xl font-bold text-amber-500">
            {formatCurrency(expense.amount)}
          </p>
          <p className="text-gray-500  text-sm">
            Agregado el{" "}
            <span className="font-bold">{formatDate(expense.createdAt)}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
