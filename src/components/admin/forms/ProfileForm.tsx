"use client";

import { updateProfile } from "@/actions/admin/profile/update-profile";
import { FormField } from "@/components/auth/inputs/FormField";
import { User } from "@/types/admin";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const [state, dispatch, pendig] = useActionState(updateProfile, {
    fields: {
      name: user.name,
      email: user.email,
    },
    errors: [],
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
          label="Name"
          name="name"
          placeholder="Tu Nombre"
          defaultValue={state.fields.name}
        />
        <FormField
          errors={state.errors}
          label="Email"
          name="email"
          placeholder="Tu Email"
          defaultValue={state.fields.email}
        />

        <input
          type="submit"
          value={pendig ? "Actualizando..." : "Actualizar Perfil"}
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
