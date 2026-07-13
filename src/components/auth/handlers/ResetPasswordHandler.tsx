"use client";

import { useState } from "react";
import { NewPasswordForm } from "../forms/NewPasswordForm";
import { OTPValidatePasswordToken } from "../inputs/OTPValidatePasswordToken";

export const ResetPasswordHandler = () => {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  return (
    <>
      {isValidToken ? (
        <NewPasswordForm />
      ) : (
        <OTPValidatePasswordToken
          setIsValidToken={setIsValidToken}
          token={token}
          setToken={setToken}
        />
      )}
    </>
  );
};
