export interface RegisterSchema {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterRequest extends RegisterSchema {}
