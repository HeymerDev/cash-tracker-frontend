"use server";

import { ResetPasswordSchema } from "@/schemas/auth";
import { NewPasswordState } from "@/types/auth/new-password";

export const resetPassword = async (
  token: string,
  prevState: NewPasswordState,
  formData: FormData,
) => {
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;

  const resetPassword = ResetPasswordSchema.safeParse({
    password,
    password_confirmation,
  });

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        password,
        password_confirmation,
      },
    };
  }

  return {
    errors: [],
    fields: { password: "", password_confirmation: "" },
    message: "Password reset successfully",
  };
};
