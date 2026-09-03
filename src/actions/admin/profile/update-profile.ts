"use server";

import { getToken } from "@/dal/token";
import { updateProfileSchema } from "@/schemas/admin/profile";
import { ResponseSchema } from "@/schemas/auth";
import { UpdateProfileState } from "@/types/admin/profile";
import { revalidatePath } from "next/cache";

export const updateProfile = async (
  prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> => {
  const token = await getToken();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const updateProfile = updateProfileSchema.safeParse({
    name,
    email,
  });

  if (!updateProfile.success) {
    return {
      errors: updateProfile.error.issues.map((error) => ({
        path: String(error.path[0]),
        message: error.message,
      })),
      fields: {
        name,
        email,
      },
    };
  }

  try {
    const request = await fetch(`${process.env.API_URL}/auth/user/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: updateProfile.data.name,
        email: updateProfile.data.email,
      }),
    });

    const json = await request.json();
    const { message } = ResponseSchema.parse(json);

    if (!request.ok) {
      return {
        errors: [],
        fields: {
          name,
          email,
        },
        message: message,
        status: request.status,
      };
    }

    revalidatePath("/admin/profile/settings");

    return {
      errors: [],
      fields: { name: "", email: "" },
      message: message,
      status: request.status,
    };
  } catch (error) {
    console.log("Error:", error); // Log the error to see what went wrong
    return {
      errors: [],
      fields: {
        name,
        email,
      },
      message: "Error interno del servidor",
      status: 500,
    };
  }
};
