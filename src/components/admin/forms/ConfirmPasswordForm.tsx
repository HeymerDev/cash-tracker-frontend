import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { FormField } from "@/components/auth/inputs/FormField";

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const budgetId = searchParams.get("deleteBudgetId");

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete("deleteBudgetId");
    router.replace(`${pathname}?${hideModal}`);
  };

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para {""}
        <span className="text-amber-500">eliminar el presupuesto {""}</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>
      <form className=" mt-14 space-y-5" noValidate>
        <FormField
          errors={[]}
          name="password"
          placeholder="Password"
          label="Ingresa tu Password para eliminar"
          type="password"
        />
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
