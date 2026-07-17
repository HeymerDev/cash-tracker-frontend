import { Budget } from "@/types/admin/budget";
import { BudgetCard } from "../cards/BudgetCard";
import Link from "next/link";

interface Props {
  budgets: Budget[];
}

export const BudgetList = ({ budgets }: Props) => {
  return (
    <>
      {budgets.length ? (
        <ul role="list" className="divide-y divide-gray-300 shadow-lg mt-10 ">
          {budgets.map((budget: Budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </ul>
      ) : (
        <h2 className="text-center text-xl font-medium text-amber-300">
          No tienes budgets aun,{" "}
          <Link href={`/admin/budget/new`} className="text-purple-600">
            Crea El primero
          </Link>
        </h2>
      )}
    </>
  );
};
