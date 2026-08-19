import { FormField } from "@/components/auth/inputs/FormField";
import { DialogTitle } from "@headlessui/react";

export function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
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
        />

        <FormField
          errors={[]}
          name="amount"
          placeholder="Cantidad del gasto"
          label="Cantidad del gasto"
          type="number"
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
