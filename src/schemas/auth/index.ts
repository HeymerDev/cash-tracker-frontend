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

export const ResponseSchema = z.object({
  message: z.string(),
});

export const VerifyEmailSchema = z.object({
  token: z.string().length(6, "Token inválido"),
});
