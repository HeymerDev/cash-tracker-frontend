export type ValidateToeknPasswordState = {
  errors: string[];
  message: string;
};

export type NewPasswordError = {
  path: string;
  message: string;
};
export type NewPasswordFields = {
  password: string;
  password_confirmation: string;
};

export type NewPasswordState = {
  errors: NewPasswordError[];
  fields: NewPasswordFields;
  message?: string;
  status?: number;
};
