"use server";

import { LoginResponseSchema, LoginSchema } from "@/schemas/auth";
import { LoginResponse, LoginState } from "@/types/auth/login";
import { cookies } from "next/headers";

export const login = async (prevState: LoginState, formData: FormData) => {
  const cookieStore = await cookies();

  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = LoginSchema.safeParse(loginData);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        email: loginData.email,
      },
    };
  }

  try {
    const request = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: auth.data.email,
        password: auth.data.password,
      }),
    });

    const json: LoginResponse = await request.json();
    const response = LoginResponseSchema.parse(json);

    if (response.token) {
      cookieStore.set({
        name: "CASHTRACKER_TOKEN",
        value: response.token,
        httpOnly: true,
        path: "/",
      });
    }

    return {
      errors: [],
      fields: request.ok
        ? {
            email: "",
          }
        : {
            email: loginData.email,
          },
      response: response.message,
      status: request.status,
    };
  } catch (error) {
    console.log(error);
    return {
      errors: prevState.errors,
      fields: loginData,
    };
  }
};
