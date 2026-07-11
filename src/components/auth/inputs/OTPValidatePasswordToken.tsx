"use client";

import { validateTokenPassword } from "@/actions/auth/new-password/validate-token-password";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

interface Props {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
}

export const OTPValidatePasswordToken = ({ setIsValidToken }: Props) => {
  const [token, setToken] = useState<string>("");

  const validateTokenAction = useMemo(
    () => validateTokenPassword.bind(null, token),
    [token],
  );

  const [state, dispatch, isPending] = useActionState(validateTokenAction, {
    errors: [],
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast.success(state.message, {
        description: "Puedes asignar una nueva contraseña ahora",
      });

      setIsValidToken(true);
    }

    state.errors.forEach((error) => {
      toast.error(error);
    });
  }, [state, setIsValidToken]);

  const handleChange = (token: string) => {
    setToken(token);
  };

  const handleComplete = () => {
    startTransition(() => {
      dispatch();
    });
  };

  return (
    <div className="grid justify-center gap-5 my-10">
      <div className="flex justify-center gap-5 my-10">
        <PinInput value={token} onChange={handleChange}>
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
          <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        </PinInput>
      </div>

      <button
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        onClick={handleComplete}
        disabled={isPending}
      >
        {isPending ? "Verificando..." : "Validar Código"}
      </button>
    </div>
  );
};
