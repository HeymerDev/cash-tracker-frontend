"use server";

import { ForgotPasswordSchema, ResponseSchema } from "@/schemas/auth";
import { ForgotPasswordState } from "@/types/auth/forgot-password";

export const forgotPassword = async (
  prevState: ForgotPasswordState,
  formData: FormData,
) => {
  const email = formData.get("email") as string;

  const forgotPassword = ForgotPasswordSchema.safeParse({ email });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((error) => error.message),
      message: "",
    };
  }

  try {
    const req = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: forgotPassword.data.email,
      }),
    });

    const json = await req.json();
    const { message } = ResponseSchema.parse(json);

    if (!req.ok) {
      return { errors: [message], message: "" };
    }

    return {
      message,
      errors: [],
    };
  } catch (error) {
    return {
      errors: [
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
      ],
      message: "",
    };
  }
};
