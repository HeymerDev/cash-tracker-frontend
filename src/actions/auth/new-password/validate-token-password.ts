"use server";

import { ValidateToeknPasswordState } from "@/types/auth/new-password";

export const validateTokenPassword = async (
  token: string,
  prevState: ValidateToeknPasswordState,
) => {
  console.log("Token:", token);

  return {
    errors: [],
    message: "Token validado correctamente",
  };
};
