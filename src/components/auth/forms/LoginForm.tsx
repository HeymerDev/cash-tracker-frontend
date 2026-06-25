"use client";

import { login } from "@/actions/auth/login/login";
import { useActionState, useEffect } from "react";
import { FormField } from "../inputs/FormField";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(login, {
    errors: [],
    fields: { email: "" },
  });

  return (
    <>
      <form action={dispatch} className="mt-14 space-y-5" noValidate>
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Ingresa tu email"
          errors={state.errors}
          defaultValue={state.fields.email}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Ingresa tu password"
          errors={state.errors}
        />

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
};
