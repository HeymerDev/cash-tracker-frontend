import { LoginForm } from "@/components/auth/forms/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTracker - Iniciar Sesión",
  description:
    "Inicia sesión en CashTracker para controlar tus finanzas de manera eficiente.",
  authors: [{ name: "HeymerDev" }],
  keywords: [
    "CashTracker",
    "Iniciar Sesión",
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

const LoginPage = () => {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Iniciar Sesión</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <LoginForm />

      <nav className="mt-10 flex flex-col gap-4">
        <Link href="/auth/register" className="text-center text-gray-500">
          ¿Aún no tienes una cuenta? Regístrate aquí
        </Link>

        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          ¿Olvidaste tu contraseña? Restablecela aquí
        </Link>
      </nav>
    </>
  );
};

export default LoginPage;
