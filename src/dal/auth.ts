import "server-only";
import { cache } from "react";
import { UserSchema } from "@/schemas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const request = await fetch(`${process.env.API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await request.json();
    const session = UserSchema.safeParse(json);

    if (!session.success) {
      redirect("/auth/login");
    }

    return {
      user: session.data,
      isAuth: true,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
    redirect("/auth/login");
  }
});
