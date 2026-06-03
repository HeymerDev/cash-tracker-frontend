import { RegisterFrom } from "@/components/auth/forms/RegisterFrom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CashTracker - Registrar",
  description:
    "Crea una nueva cuenta en CashTracker para controlar tus finanzas de manera eficiente.",
  authors: [{ name: "HeymerDev" }],
  keywords: [
    "CashTracker",
    "Registrar",
    "Crear cuenta",
    "Control de finanzas",
    "Gestión financiera",
    "Aplicación de finanzas",
    "Seguimiento de gastos",
    "Presupuesto personal",
    "Finanzas personales",
    "App de finanzas",
  ],
};

const RegisterPage = () => {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Crear una Cuenta</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <RegisterFrom />
    </>
  );
};

export default RegisterPage;
