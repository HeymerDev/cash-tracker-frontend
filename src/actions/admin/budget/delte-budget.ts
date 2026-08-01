"use server";

import { getToken } from "@/dal/token";
import { PasswordValidationSchema } from "@/schemas/admin/budget";
import { ResponseSchema } from "@/schemas/auth";
import { Budget, DeletBudgetState } from "@/types/admin/budget";

export const deleteBudget = async (
  id: Budget["id"],
  prevState: DeletBudgetState,
  formData: FormData,
) => {
  const token = await getToken();

  const password = formData.get("password") as string;

  const validatePassword = PasswordValidationSchema.safeParse(password);

  if (!validatePassword.success) {
    console.log("sin validacion", validatePassword.error.issues);
    return {
      errors: validatePassword.error.issues.map((error) => ({
        path: "password",
        message: error.message,
      })),
      fields: {
        password: password,
      },
      message: "",
    };
  }

  try {
    const request = await fetch(`${process.env.API_URL}/auth/check-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: validatePassword.data,
      }),
    });

    const json = await request.json();

    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return {
        errors: [],
        fields: {
          password: password,
        },
        message: message,
        status: request.status,
      };
    }

    const deleteRequest = await fetch(`${process.env.API_URL}/budgets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const deleteJson = await deleteRequest.json();

    const { message: deleteMessage } = ResponseSchema.parse(deleteJson);
    if (!deleteRequest.ok) {
      return {
        errors: [],
        fields: {
          password: password,
        },
        message: deleteMessage,
        status: deleteRequest.status,
      };
    }

    return {
      errors: [],
      fields: {
        password: "",
      },
      message: deleteMessage,
      status: deleteRequest.status,
    };
  } catch (error) {
    console.error("Error checking password:", error);
    return {
      errors: [],
      fields: {
        password: password,
      },
      message: "An error occurred while checking the password.",
    };
  }
};
