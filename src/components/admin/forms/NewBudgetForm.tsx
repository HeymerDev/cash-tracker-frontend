"use client";

import { createBudget } from "@/actions/admin/budget/create-budget";
import { FormField } from "@/components/auth/inputs/FormField";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function CreateBudgetForm() {
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState(createBudget, {
    errors: [],
    message: "",
    fields: { name: "", amount: 0 },
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.status === 201) {
      toast.success(state.message, {
        onDismiss: () => {
          router.push("/admin");
        },
        onAutoClose: () => {
          router.push("/admin");
        },
      });
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

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
