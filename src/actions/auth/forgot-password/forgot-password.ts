"use server";

import { ForgotPasswordSchema } from "@/schemas/auth";
import { ForgotPasswordState } from "@/types/auth/forgot-password";

export const forgotPassword = async (
  prevState: ForgotPasswordState,
  formData: FormData,
) => {
  console.log("FormData:", formData);
  const email = formData.get("email") as string;

  const forgotPassword = ForgotPasswordSchema.safeParse({ email });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((error) => error.message),
      message: "",
    };
  }

  return {
    errors: [],
    message: "Instrucciones enviadas al correo electrónico.",
  };
};
