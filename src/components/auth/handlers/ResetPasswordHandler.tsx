"use client";

import { useState } from "react";
import { NewPasswordForm } from "../forms/NewPasswordForm";
import { OTPValidatePasswordToken } from "../inputs/OTPValidatePasswordToken";

export const ResetPasswordHandler = () => {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  return (
    <>
      {isValidToken ? (
        <NewPasswordForm />
      ) : (
        <OTPValidatePasswordToken setIsValidToken={setIsValidToken} />
      )}
    </>
  );
};
