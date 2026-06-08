"use server";

import { RegisterSchema } from "@/schemas/auth";

export const createAccount = async (formData: FormData) => {
  const registerData = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };

  const register = RegisterSchema.safeParse(registerData);

  const errors = register.error?.issues.map((error) => ({
    path: error.path[0],
    message: error.message,
  }));

  if (!register.success) return errors;

  try {
    const request = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: register.data.email,
        name: register.data.name,
        password: register.data.password,
      }),
    });

    const response = await request.json();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
