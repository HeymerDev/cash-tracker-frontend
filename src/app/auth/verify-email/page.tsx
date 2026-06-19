import { OTPConfirmAccount } from "@/components/auth/inputs/OTPConfirmAccount";

const VerifyEmailPage = () => {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Confirma tu cuenta
      </h1>
      <p className="text-3xl font-bold">
        Ingresa el codigo que recibiste por{" "}
        <span className="text-amber-500">email</span> aqui
      </p>

      <OTPConfirmAccount />
    </>
  );
};

export default VerifyEmailPage;
