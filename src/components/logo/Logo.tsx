import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="CashTracker Logo"
      width={400}
      height={123}
      priority
    />
  );
};
