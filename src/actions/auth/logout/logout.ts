"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookiesStore = await cookies();

  cookiesStore.delete("CASHTRACKER_TOKEN");
  redirect("/auth/login");
};
