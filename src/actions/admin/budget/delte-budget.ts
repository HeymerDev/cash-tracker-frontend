"use server";

import { PasswordValidationSchema } from "@/schemas/admin/budget";
import { Budget, DeletBudgetState } from "@/types/admin/budget";

export const deleteBudget = async (
  id: Budget["id"],
  prevState: DeletBudgetState,
  formData: FormData,
) => {
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

  return {
    errors: [],
    fields: {
      password: "",
    },
    message: "",
  };
};
