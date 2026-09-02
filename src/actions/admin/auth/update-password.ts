"use server";

import { getToken } from "@/dal/token";
import { UpdatePasswordSchema, ResponseSchema } from "@/schemas/auth";
import { UpdatePasswordState } from "@/types/auth/new-password";

export const updatePassword = async (
  prevState: UpdatePasswordState,
  formData: FormData,
): Promise<UpdatePasswordState> => {
  const token = await getToken();
  const password = formData.get("password") as string;
  const current_password = formData.get("current_password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;

  const updatePassword = UpdatePasswordSchema.safeParse({
    password,
    current_password,
    password_confirmation,
  });

  if (!updatePassword.success) {
    return {
      errors: updatePassword.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        password,
        current_password,
        password_confirmation,
      },
    };
  }

  try {
    const request = await fetch(
      `${process.env.API_URL}/auth/update-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: updatePassword.data.password,
          current_password: updatePassword.data.current_password,
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
          current_password,
          password_confirmation,
        },
        message: message,
        status: request.status,
      };
    }

    return {
      errors: [],
      fields: { password: "", current_password: "", password_confirmation: "" },
      message: message,
      status: request.status,
    };
  } catch (error) {
    console.log("Error:", error); // Log the error to see what went wrong
    return {
      errors: [],
      fields: {
        password,
        current_password,
        password_confirmation,
      },
      message: "Error interno del servidor",
      status: 500,
    };
  }
};
