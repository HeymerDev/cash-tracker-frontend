import { formatCurrency } from "@/utils";

interface Props {
  label: string;
  amount: number;
}

export const Amount = ({ label, amount }: Props) => {
  return (
    <p className="text-2xl font-bold">
      {label}:{" "}
      <span className="text-amber-500 font-medium">
        {formatCurrency(amount)}
      </span>
    </p>
  );
};
