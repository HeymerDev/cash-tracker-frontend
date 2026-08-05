"use client";

import { useRouter } from "next/navigation";

export const AddExpenseButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-10 rounded-lg cursor-pointer"
      onClick={() => router.push("?addExpense=true&showModal=true")}
    >
      Agregar Gasto
    </button>
  );
};
