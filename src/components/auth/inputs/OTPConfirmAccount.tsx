"use client";

import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";

export const OTPConfirmAccount = () => {
  const [token, setToken] = useState("");

  const handleChange = (token: string) => {
    setToken(token);
  };

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput value={token} onChange={handleChange}>
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
      </PinInput>
    </div>
  );
};
