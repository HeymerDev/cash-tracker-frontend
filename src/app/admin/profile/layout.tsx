import { ProfileTabs } from "@/components/admin/navigations/ProfileTabs";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProfileTabs />
      {children}
    </>
  );
}
