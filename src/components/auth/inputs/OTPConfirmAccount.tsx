"use client";

import { verifyEmail } from "@/actions/auth/verify-email/verify-email";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useActionState, useState, startTransition, useEffect } from "react";
import { toast } from "sonner";

export const OTPConfirmAccount = () => {
  const [token, setToken] = useState("");

  const verifyEmailAction = verifyEmail.bind(null, token);
  const [state, dispatch] = useActionState(verifyEmailAction, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      queueMicrotask(() => {
        setToken("");
      });
    }

    state.errors.forEach((error) => {
      toast.error(error);
    });
  }, [state.success, state.errors]);

  console.log("render", token, state.success);

  const handleChange = (token: string) => {
    setToken(token);
  };

  const handleVerify = async () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <div className="grid justify-center gap-5 my-10">
      <div className="flex gap-5 my-10">
        <PinInput value={token} onChange={handleChange}>
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className=" h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        </PinInput>
      </div>

      <button
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        onClick={handleVerify}
      >
        Confirmar Cuenta
      </button>
    </div>
  );
};
