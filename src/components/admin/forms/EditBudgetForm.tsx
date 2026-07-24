"use client";

import { editBudget } from "@/actions/admin/budget/edit-budget";
import { FormField } from "@/components/auth/inputs/FormField";
import { Budget } from "@/types/admin/budget";
import { useActionState } from "react";

interface Props {
  budget: Budget;
}

export const EditBudgetForm = ({ budget }: Props) => {
  const editBudgetAction = editBudget.bind(null, budget.id);

  const [state, dispatch, isPending] = useActionState(editBudgetAction, {
    errors: [],
    message: "",
    fields: { amount: Number(budget.amount), name: budget.name },
  });

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      <FormField
        errors={state.errors}
        name="name"
        placeholder="Nombre del presupuesto"
        label="Nombre del presupuesto"
        defaultValue={state.fields.name}
      />

      <FormField
        errors={[]}
        name="amount"
        placeholder="Cantidad Presupuesto"
        label="Cantidad Presupuesto"
        type="number"
        defaultValue={state.fields.amount}
      />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value={isPending ? "Editando Presupuesto" : "Editar Presupuesto"}
      />
    </form>
  );
};
