import { ForgotPasswordForm } from "@/components/auth/forms/ForgotPassword";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTracker - Recuperar Contraseña",
  description:
    "Recupera tu contraseña en CashTracker para acceder a tu cuenta y controlar tus finanzas de manera eficiente.",
  authors: [{ name: "HeymerDev" }],
  keywords: [
    "CashTracker",
    "Recuperar Contraseña",
    "Acceder a cuenta",
    "Control de finanzas",
    "Gestión financiera",
    "Aplicación de finanzas",
    "Seguimiento de gastos",
    "Presupuesto personal",
    "Finanzas personales",
    "App de finanzas",
  ],
};

const ForgotPasswordPage = () => {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Recuperar Contraseña
      </h1>
      <p className="text-3xl font-bold">
        aqui puedes <span className="text-amber-500">restablecer</span> tu
        contraseña
      </p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col gap-4">
        <Link href="/auth/register" className="text-center text-gray-500">
          ¿Aún no tienes una cuenta? Regístrate aquí
        </Link>

        <Link href="/auth/login" className="text-center text-gray-500">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  );
};

export default ForgotPasswordPage;
