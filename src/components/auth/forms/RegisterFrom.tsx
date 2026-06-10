"use client";

import { useActionState } from "react";
import { createAccount } from "@/actions/auth/register/create-account";
import { ErrorMessage } from "../errors/ErrorMessage";

export const RegisterFrom = () => {
  const [state, dispatch] = useActionState(createAccount, {
    errors: [],
  });

  const hasError = (field: string) =>
    state.errors.some((error) => error.path === field);

  console.log(state);

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch}>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className={`w-full p-3 rounded-lg border ${
            hasError("email")
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-300"
          }`}
          name="email"
        />

        {state.errors
          .filter((error) => error.path === "email")
          .map((error) => (
            <ErrorMessage
              key={`${error.path}-${error.message}`}
              message={error.message}
            />
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Nombre</label>
        <input
          type="name"
          placeholder="Nombre de Registro"
          className={`w-full p-3 rounded-lg border ${
            hasError("name")
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-300"
          }`}
          name="name"
        />

        {state.errors
          .filter((error) => error.path === "name")
          .map((error) => (
            <ErrorMessage
              key={`${error.path}-${error.message}`}
              message={error.message}
            />
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className={`w-full p-3 rounded-lg border ${
            hasError("password")
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-300"
          }`}
          name="password"
        />

        {state.errors
          .filter((error) => error.path === "password")
          .map((error) => (
            <ErrorMessage
              key={`${error.path}-${error.message}`}
              message={error.message}
            />
          ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className={`w-full p-3 rounded-lg border ${
            hasError("password_confirmation")
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-300"
          }`}
          name="password_confirmation"
        />

        {state.errors
          .filter((error) => error.path === "password_confirmation")
          .map((error) => (
            <ErrorMessage
              key={`${error.path}-${error.message}`}
              message={error.message}
            />
          ))}
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
};
