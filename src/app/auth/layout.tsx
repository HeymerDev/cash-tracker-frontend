import { Logo } from "@/components/logo/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <section className="bg-purple-950 flex justify-center lg:bg-auth">
          <div className="py-10 lg:py-20">
            <Logo />
          </div>
        </section>
        <section className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">{children}</div>
        </section>
      </aside>
    </>
  );
}
