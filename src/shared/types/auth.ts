export interface IUser {
  id?: string;
  name: string;
  username: string;
}

export interface IAuthRegisterForm extends IUser {
  password: string;
  confirmPassword: string;
}

export type IAuthLoginForm = Omit<
  IAuthRegisterForm,
  "confirmPassword" | "name"
>;

export interface IAuthResponse {
  accessToken: string;
}

export type AuthRegisterRequest = Omit<IAuthRegisterForm, "confirmPassword">;
