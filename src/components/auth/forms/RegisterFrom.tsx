"use client";

import { useActionState, useEffect } from "react";
import { createAccount } from "@/actions/auth/register/create-account";
import { RegisterState } from "@/types/auth/register";
import { toast } from "sonner";
import { FormField } from "../inputs/FormField";

export const RegisterFrom = () => {
  const initialState: RegisterState = {
    errors: [],
    fields: {
      email: "",
      name: "",
    },
  };
  const [state, dispatch] = useActionState(createAccount, initialState);

  useEffect(() => {
    if (!state.response) return;

    if (state.status === 201) {
      toast.success(state.response.message);
    } else {
      toast.error(state.response.message);
    }
  }, [state.response, state.status]);

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch}>
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="Email de Registro"
        errors={state.errors}
        defaultValue={state.fields.email}
      />

      <FormField
        label="Nombre"
        name="name"
        placeholder="Nombre de Registro"
        errors={state.errors}
        defaultValue={state.fields.name}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Password de Registro"
        errors={state.errors}
      />

      <FormField
        label="Repetir Password"
        name="password_confirmation"
        type="password"
        placeholder="Repite Password de Registro"
        errors={state.errors}
      />

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
};
