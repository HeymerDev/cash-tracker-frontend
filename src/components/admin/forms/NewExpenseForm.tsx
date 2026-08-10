import { createExpense } from "@/actions/admin/expense/create-expense";
import { FormField } from "@/components/auth/inputs/FormField";
import { DialogTitle } from "@headlessui/react";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export const NewExpenseForm = () => {
  const { id } = useParams();

  const createExpenseAction = createExpense.bind(null, id as string);

  const [state, dispatch, pending] = useActionState(createExpenseAction, {
    errors: [],
    fields: {
      name: "",
      amount: 0,
    },
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.status === 201) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
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
          placeholder={"Nombre del gasto"}
          label="Nombre del gasto"
          defaultValue={state.fields.name}
        />

        <FormField
          errors={state.errors}
          name="amount"
          placeholder={"Cantidad Gastada"}
          label="Cantidad Gastada"
          type="number"
          defaultValue={state.fields.amount}
        />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value={pending ? "Creando Gasto..." : "Crear Gasto"}
          disabled={pending}
        />
      </form>
    </>
  );
};
