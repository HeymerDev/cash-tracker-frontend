export type UpdateProfileError = {
  path: string;
  message: string;
};

export type UpdateProfileFields = {
  name: string;
  email: string;
};

export type UpdateProfileState = {
  errors: UpdateProfileError[];
  fields: UpdateProfileFields;
  message?: string;
  status?: number;
};
