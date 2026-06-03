import { LoginForm } from "@/components/auth/forms/LoginForm";
import { Metadata } from "next";

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
    </>
  );
};

export default LoginPage;
