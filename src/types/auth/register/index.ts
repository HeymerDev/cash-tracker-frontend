export type RegisterError = {
  path: string;
  message: string;
};

export type RegisterState = {
  errors: RegisterError[];
};
