import React from "react";
import { FormField } from "../inputs/FormField";

export const NewPasswordForm = () => {
  return (
    <form className=" mt-14 space-y-5" noValidate>
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Password de Registro"
        errors={[]}
      />

      <FormField
        label="Repetir Password"
        name="password_confirmation"
        type="password"
        placeholder="Confirma tu Password"
        errors={[]}
      />

      <input
        type="submit"
        value="Guardar Password"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
};
