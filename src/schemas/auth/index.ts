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

export const LoginSchema = z.object({
  email: z.email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vacio" }),
});

export const LoginResponseSchema = z.object({
  message: z.string(),
  token: z.string().optional(),
});

export const ResponseSchema = z.object({
  message: z.string(),
});

export const TokenSchema = z.object({
  token: z.string().length(6, "Token inválido"),
});

export const ForgotPasswordSchema = z.object({
  email: z.email({ message: "Email no válido" }),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});
