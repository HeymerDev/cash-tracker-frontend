import { cache } from "react";
import { UserSchema } from "@/schemas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    console.error(error);
  }
});
