export type CreateBudgetError = {
  path: string;
  message: string;
};

export type CreateBudgetFields = {
  name: string;
  amount: number;
};

export type CreateBudgetState = {
  errors: CreateBudgetError[];
  fields: CreateBudgetFields;
  message: string;
  status?: number;
};
