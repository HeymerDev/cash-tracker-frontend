import { resetPassword } from "@/actions/auth/new-password/reset-password";
import { FormField } from "../inputs/FormField";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
}
export const NewPasswordForm = ({ token }: Props) => {
  const router = useRouter();

  const resetPasswordAction = resetPassword.bind(null, token);

  const [state, dispatch, pending] = useActionState(resetPasswordAction, {
    errors: [],
    fields: { password: "", password_confirmation: "" },
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    if (state.status === 200) {
      toast.success(state.message, {
        onDismiss: () => {
          router.push("/auth/login");
        },
        onAutoClose: () => {
          router.push("/auth/login");
        },
      });
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Password de Registro"
        errors={state.errors}
        defaultValue={state.fields.password}
      />

      <FormField
        label="Repetir Password"
        name="password_confirmation"
        type="password"
        placeholder="Confirma tu Password"
        errors={state.errors}
        defaultValue={state.fields.password_confirmation}
      />

      <input
        type="submit"
        value={pending ? "Cambiando Password" : "Cambiar Password"}
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
};
