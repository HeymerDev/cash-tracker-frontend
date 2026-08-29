"use client";

import { FormField } from "@/components/auth/inputs/FormField";

export function UpdatePasswordForm() {
  return (
    <>
      <form className=" mt-14 space-y-5" noValidate>
        <FormField
          errors={[]}
          label="Password Actual"
          name="current_password"
          type="password"
          placeholder="Password Actual"
        />

        <FormField
          errors={[]}
          label="Nuevo Password"
          name="password"
          placeholder="Nuevo Password"
          type="password"
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
          value="Cambiar Password"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
