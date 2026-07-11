"use server";

import { ValidateToeknPasswordState } from "@/types/auth/new-password";
import { ResponseSchema, TokenSchema } from "@/schemas/auth/index";

export const validateTokenPassword = async (
  token: string,
  prevState: ValidateToeknPasswordState,
) => {
  const resetPasswordToken = TokenSchema.safeParse({ token });

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((error) => error.message),
      message: "",
    };
  }

  try {
    const request = await fetch(
      `${process.env.API_URL}/auth/validate-reset-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetPasswordToken.data.token,
        }),
      },
    );

    const json = await request.json();
    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
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

  return {
    errors: [],
    message: "Token validado correctamente",
  };
};
