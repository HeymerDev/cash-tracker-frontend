import { Logo } from "@/components/logo/Logo";
import Link from "next/link";

const features = [
  {
    title: "Organización sin Esfuerzo",
    description:
      "Clasifica y visualiza tus gastos de forma clara y ordenada, sin complicaciones con nuestro panel amigable y fácil de usar.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    ),
  },
  {
    title: "Presupuestación Inteligente",
    description:
      "Establece objetivos financieros realistas y sigue tu progreso con nuestras herramientas de presupuestación inteligente.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    ),
  },
  {
    title: "Acceso en cualquier lugar",
    description:
      "Nuestra plataforma está disponible para que puedas gestionar tus finanzas desde donde te encuentres.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    ),
  },
  {
    title: "Seguridad Garantizada",
    description:
      "Protegemos tus datos con los más altos estándares de seguridad, para que puedas utilizar nuestra plataforma con total tranquilidad.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-purple-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-950 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-no-repeat bg-botto-left"
          style={{
            backgroundImage: "url('/grafico.svg')",
            backgroundSize: "32rem",
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-5 py-20 lg:py-28">
          <span className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm font-semibold text-amber-400 mb-6">
            💰 Tus finanzas, bajo control
          </span>
          <h1 className="font-black text-4xl lg:text-7xl leading-tight max-w-3xl">
            Administrador de <span className="text-amber-500">Gastos</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-bold mt-6">
            controla tus <span className="text-amber-500">finanzas</span>
          </p>
          <p className="text-lg text-purple-100/90 mt-6 max-w-2xl">
            Domina tus finanzas con CashTrackr. Simplifica la gestión de tus
            ingresos y egresos en un solo lugar, de manera intuitiva y
            eficiente. Toma el control total de tus finanzas personales o
            empresariales con nuestra plataforma fácil de usar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/auth/register"
              className="bg-amber-500 hover:bg-amber-400 text-purple-950 font-black uppercase rounded-lg px-8 py-3 text-center transition-colors shadow-lg shadow-amber-500/20"
            >
              Comenzar Gratis
            </Link>
            <Link
              href="/auth/login"
              className="border-2 border-white/30 hover:border-amber-500 hover:text-amber-500 text-white font-bold uppercase rounded-lg px-8 py-3 text-center transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <main className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-black text-4xl lg:text-5xl text-purple-950">
            Ventajas de <span className="text-amber-500">CashTrackr</span>
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Todo lo que necesitas para llevar tus finanzas al siguiente nivel.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-purple-100 hover:border-amber-500/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-950 text-amber-500 group-hover:bg-amber-500 group-hover:text-purple-950 transition-colors mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-purple-950 font-black text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </li>
          ))}
        </ol>
      </main>

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="relative overflow-hidden bg-purple-950 rounded-3xl px-8 py-16 text-center text-white">
          <div className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-black text-3xl lg:text-4xl">
              Empieza a controlar tus{" "}
              <span className="text-amber-500">finanzas</span> hoy
            </h2>
            <p className="text-purple-100/90 text-lg mt-4 max-w-xl mx-auto">
              Crea tu cuenta en segundos y toma el control total de tu dinero.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-purple-950 font-black uppercase rounded-lg px-8 py-3 mt-8 transition-colors shadow-lg shadow-amber-500/20"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </div>

        <nav className="flex flex-col lg:flex-row lg:justify-between gap-5 mt-12">
          <Link
            href="/auth/register"
            className="text-gray-500 hover:text-purple-950 text-sm uppercase text-center transition-colors"
          >
            ¿No tienes cuenta? Crea una
          </Link>
          <Link
            href="/auth/login"
            className="text-gray-500 hover:text-purple-950 text-sm uppercase text-center transition-colors"
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </Link>
        </nav>
      </section>
    </div>
  );
}
