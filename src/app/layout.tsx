import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashTracker - Controla tus finanzas personales de manera eficiente",
  description:
    "CashTracker es una aplicación de finanzas personales que te ayuda a controlar tus gastos, crear presupuestos y tomar decisiones financieras inteligentes. Con CashTracker, puedes gestionar tus finanzas de manera eficiente y alcanzar tus objetivos financieros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
