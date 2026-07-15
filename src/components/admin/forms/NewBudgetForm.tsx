"use client";

import { createBudget } from "@/actions/admin/budget/create-budget";
import { FormField } from "@/components/auth/inputs/FormField";
import { useActionState } from "react";

export function CreateBudgetForm() {
  const [state, dispatch, isPending] = useActionState(createBudget, {
    errors: [],
    message: "",
    fields: { name: "", amount: 0 },
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
        errors={state.errors}
        name="amount"
        placeholder="Cantidad Presupuesto"
        label="Cantidad Presupuesto"
        type="number"
        defaultValue={state.fields.amount}
      />
      <input
        disabled={isPending}
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value={isPending ? "Creando Presupuesto" : "Crear Presupuesto"}
      />
    </form>
  );
}
