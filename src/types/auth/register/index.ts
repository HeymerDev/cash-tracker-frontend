export type RegisterError = {
  path: string;
  message: string;
};

export type RegisterResponse = {
  message: string;
};

export type RegisterFields = {
  email: string;
  name: string;
};

export type RegisterState = {
  errors: RegisterError[];
  fields: RegisterFields;
  response?: RegisterResponse;
};
