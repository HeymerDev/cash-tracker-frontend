import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { deleteExpense } from "@/actions/admin/expense/delete-expense";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

type DeleteExpenseForm = {
  closeModal: () => void;
};

export function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpenseId")!;

  const router = useRouter();

  const deleteExpenseAction = deleteExpense.bind(
    null,
    Number(budgetId),
    Number(expenseId),
  );

  const [state, dispatch, pending] = useActionState(deleteExpenseAction, {
    message: "",
  });

  const handleClick = () => {
    startTransition(() => {
      dispatch();
    });
  };
  const { message, status } = state;

  useEffect(() => {
    if (!message) return;

    if (status === 200) {
      toast.success(message);

      closeModal();
    } else {
      toast.error(message);
    }
  }, [message, status, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Confirma para eliminar, {""}
        <span className="text-amber-500">el gasto</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          onClick={() => handleClick()}
          type="button"
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
        >
          {pending ? "Eliminando Gasto" : "Eliminar Gasto"}
        </button>
      </div>
    </>
  );
}
