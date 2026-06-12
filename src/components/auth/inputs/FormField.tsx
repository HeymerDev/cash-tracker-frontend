// components/forms/FormField.tsx

import { ErrorMessage } from "../errors/ErrorMessage";
import { hasError } from "@/utils";
import { RegisterError } from "@/types/auth/register";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  errors: RegisterError[];
  defaultValue?: string;
};

export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  errors,
  defaultValue,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-2xl" htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full p-3 rounded-lg border ${
          hasError(errors, name)
            ? "border-red-500 placeholder:text-red-500"
            : "border-gray-300"
        }`}
      />

      {errors
        .filter((error) => error.path === name)
        .map((error) => (
          <ErrorMessage
            key={`${error.path}-${error.message}`}
            message={error.message}
          />
        ))}
    </div>
  );
};
