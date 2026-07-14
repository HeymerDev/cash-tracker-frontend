"use client";

import { FormField } from "@/components/auth/inputs/FormField";

export function CreateBudgetForm() {
  return (
    <form className="mt-10 space-y-3" noValidate>
      <FormField
        errors={[]}
        name="name"
        placeholder="Nombre del presupuesto"
        label="Nombre del presupuesto"
      />

      <FormField
        errors={[]}
        name="amount"
        placeholder="Cantidad Presupuesto"
        label="Cantidad Presupuesto"
        type="number"
      />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  );
}
