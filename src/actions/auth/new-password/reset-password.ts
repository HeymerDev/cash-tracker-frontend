"use server";

import { ResetPasswordSchema, ResponseSchema } from "@/schemas/auth";
import { NewPasswordState } from "@/types/auth/new-password";

export const resetPassword = async (
  token: string,
  prevState: NewPasswordState,
  formData: FormData,
): Promise<NewPasswordState> => {
  console.log("Token:", token); // Log the token to verify it's being passed correctly
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

  try {
    const request = await fetch(
      `${process.env.API_URL}/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: resetPassword.data.password,
          password_confirmation: resetPassword.data.password_confirmation,
        }),
      },
    );

    const json = await request.json();
    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return {
        errors: [],
        fields: {
          password,
          password_confirmation,
        },
        message: message,
        status: request.status,
      };
    }

    return {
      errors: [],
      fields: { password: "", password_confirmation: "" },
      message: message,
      status: request.status,
    };
  } catch (error) {
    console.log("Error:", error); // Log the error to see what went wrong
    return {
      errors: [],
      fields: {
        password,
        password_confirmation,
      },
      message: "Error interno del servidor",
      status: 500,
    };
  }
};
