"use client";

import { updatePassword } from "@/actions/admin/auth/update-password";
import { FormField } from "@/components/auth/inputs/FormField";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function UpdatePasswordForm() {
  const [state, dispatch, pending] = useActionState(updatePassword, {
    errors: [],
    fields: { password: "", current_password: "", password_confirmation: "" },
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.status === 200) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form className=" mt-14 space-y-5" noValidate action={dispatch}>
        <FormField
          errors={state.errors}
          label="Password Actual"
          name="current_password"
          type="password"
          placeholder="Password Actual"
          defaultValue={state.fields.current_password}
        />

        <FormField
          errors={state.errors}
          label="Nuevo Password"
          name="password"
          placeholder="Nuevo Password"
          type="password"
          defaultValue={state.fields.password}
        />

        <FormField
          label="Repetir Password"
          name="password_confirmation"
          type="password"
          defaultValue={state.fields.password_confirmation}
          placeholder="Confirma tu Password"
          errors={state.errors}
        />

        <input
          type="submit"
          value={pending ? "Cambiando Password" : "Cambiar Password"}
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
