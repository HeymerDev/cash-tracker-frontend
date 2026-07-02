import { UserSchema } from "@/schemas/auth";
import { z } from "zod";

export type User = z.infer<typeof UserSchema>;
