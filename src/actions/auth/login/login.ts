"use server";

import { LoginSchema } from "@/schemas/auth";

export const login = async (prevState: unknown, formData: FormData) => {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginData);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
    };
  }

  console.log(loginData);
};
