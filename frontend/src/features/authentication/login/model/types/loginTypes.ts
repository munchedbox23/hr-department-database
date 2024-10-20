export type LoginSchema = {
  email: string;
  password: string;
};

export interface ILoginResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest extends LoginSchema {} 
