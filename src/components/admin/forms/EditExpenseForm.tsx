import { editExpense } from "@/actions/admin/expense/edit-expense";
import { getExpenseById } from "@/api/admin/expenses/getExpenseById";
import { FormField } from "@/components/auth/inputs/FormField";
import { Expense } from "@/types/admin/expense";
import { DialogTitle } from "@headlessui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function EditExpenseForm() {
  const [expense, setExpense] = useState<Pick<Expense, "name" | "amount">>();

  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const expenseId = searchParams.get("expenseId") as string;

  const editExpenseAction = editExpense.bind(
    null,
    Number(budgetId),
    Number(expenseId),
  );

  const [state, dispatch, pending] = useActionState(editExpenseAction, {
    errors: [],
    fields: {
      name: expense?.name || "",
      amount: expense?.amount || 0,
    },
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.status === 200) {
      toast.success(state.message);
      router.replace(`/admin/budget/${budgetId}`);
    } else {
      toast.error(state.message);
    }
  }, [state, router, budgetId]);

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
        action={dispatch}
      >
        <FormField
          errors={state.errors}
          name="name"
          placeholder="Nombre del gasto"
          label="Nombre del gasto"
          defaultValue={state.fields.name || expense?.name}
        />

        <FormField
          errors={state.errors}
          name="amount"
          placeholder="Cantidad del gasto"
          label="Cantidad del gasto"
          type="number"
          defaultValue={state.fields.amount || expense?.amount}
        />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value={pending ? "Editando Gasto" : "Editar Gasto"}
        />
      </form>
    </>
  );
}
