import { getExpenseById } from "@/api/admin/expenses/getExpenseById";
import { FormField } from "@/components/auth/inputs/FormField";
import { Expense } from "@/types/admin/expense";
import { DialogTitle } from "@headlessui/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [expense, setExpense] = useState<Pick<Expense, "name" | "amount">>();

  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();

  const expenseId = searchParams.get("expenseId") as string;

  useEffect(() => {
    const fetchExpense = async () => {
      const expense = await getExpenseById(String(budgetId), expenseId);
      setExpense({
        name: expense.name,
        amount: expense.amount,
      });
    };
    fetchExpense();
  }, [budgetId, expenseId]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 grid gap-9"
        noValidate
      >
        <FormField
          errors={[]}
          name="name"
          placeholder="Nombre del gasto"
          label="Nombre del gasto"
          defaultValue={expense?.name}
        />

        <FormField
          errors={[]}
          name="amount"
          placeholder="Cantidad del gasto"
          label="Cantidad del gasto"
          type="number"
          defaultValue={expense?.amount}
        />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
