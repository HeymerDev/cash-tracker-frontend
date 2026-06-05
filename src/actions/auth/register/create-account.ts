"use server";

export const createAccount = async (formData: FormData) => {
  const registerData = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };
};
