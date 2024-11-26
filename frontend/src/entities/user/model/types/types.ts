export interface IUser {
  email: string;
  name: string;
}

export interface IUserWithRole extends IUser {
  role: "admin" | "employee";
}

export interface IUserAuthWithoutRole extends IUser {
  success: boolean;
  user: IUser;
}

export interface IUserAuth {
  success: boolean;
  user: {
    email: string;
    name: string;
    role: "admin" | "employee";
  };
}

export interface IUserResponse extends IUserAuth {
  accessToken: string;
  refreshToken: string;
}

export interface IUserLogin extends Omit<IUser, "name"> {
  password: string;
}

export interface IUserRegister extends IUser {
  password: string;
}

export interface IUserResetPassword {
  password: string;
  token: string;
}

export type TTokenError = {
  success: false;
  message: string | null;
};

export interface IUserLogout {
  success: true;
  message: "Successful logout";
}

export interface IRefreshTokenResponse extends Omit<IUserResponse, "user"> {}
