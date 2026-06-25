export type LoginError = {
  path: string;
  message: string;
};

export type LoginResponse = {
  message: string;
};

export type LoginFields = {
  email: string;
};

export type LoginState = {
  errors: LoginError[];
  fields: LoginFields;
  response?: LoginResponse;
  status?: number;
};
