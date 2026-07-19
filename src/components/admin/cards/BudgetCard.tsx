import { Budget } from "@/types/admin/budget";
import { formatCurrency, formatDate } from "@/utils";
import Link from "next/link";

interface Props {
  budget: Budget;
}

export const BudgetCard = ({ budget }: Props) => {
  return (
    <li className="flex justify-between gap-x-6 p-5 ">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link
              href={`/admin/budget/${budget.id}`}
              className="cursor-pointer hover:underline text-2xl font-bold"
            >
              {budget.name}
            </Link>
          </p>
          <p className="text-xl font-bold text-amber-500">
            {formatCurrency(Number(budget.amount))}
          </p>
          <p className="text-gray-500  text-sm">
            Ultima Actualizacion:{" "}
            <span className="font-bold">{formatDate(budget.updatedAt)}</span>
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6"></div>
    </li>
  );
};
