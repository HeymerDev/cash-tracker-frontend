import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.email("El email no es válido"),
});
