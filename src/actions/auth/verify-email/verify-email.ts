"use server";

import { ResponseSchema, VerifyEmailSchema } from "@/schemas/auth";
import { VerifyEmailState } from "@/types/auth/verify-email";

export const verifyEmail = async (
  token: string,
  prevState: VerifyEmailState,
) => {
  const confirmToken = VerifyEmailSchema.safeParse({ token });

  if (!confirmToken.success) {
    console.log(confirmToken.error.issues.map((error) => error.message));
    return {
      errors: confirmToken.error.issues.map((error) => error.message),
      success: "",
    };
  }

  try {
    const request = await fetch(`${process.env.API_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: confirmToken.data.token,
      }),
    });

    const json = await request.json();

    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return { errors: [message], success: "" };
    }

    return {
      success: message,
      errors: [],
    };
  } catch (error) {
    return {
      errors: Array(confirmToken.error),
      success: "",
    };
  }
};
