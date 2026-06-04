import Image from "next/image";

export const Logo = () => {
  return (
    <Image src="/logo.svg" alt="CashTracker Logo" width={150} height={150} />
  );
};
