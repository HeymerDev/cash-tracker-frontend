import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.email("El email no es válido"),
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const ResponseRegisterSchema = z.object({
  message: z.string(),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(6, "El token debe tener al menos 6 caracteres"),
});
