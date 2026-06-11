"use server";

import { RegisterSchema } from "@/schemas/auth";
import { RegisterResponse, RegisterState } from "@/types/auth/register";

export const createAccount = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const registerData = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };

  const register = RegisterSchema.safeParse(registerData);

  if (!register.success) {
    return {
      errors: register.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        email: registerData.email,
        name: registerData.name,
      },
    };
  }

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

    const response: RegisterResponse = await request.json();

    return {
      errors: prevState.errors,
      status: request.status,
      response,
      fields: request.ok
        ? {
            email: "",
            name: "",
          }
        : {
            email: registerData.email,
            name: registerData.name,
          },
    };
  } catch (error) {
    console.log(error);
    return {
      errors: prevState.errors,
      fields: registerData,
    };
  }
};
