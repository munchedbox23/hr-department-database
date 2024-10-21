export interface IUser {
  email: string;
  name: string;
}

export interface IUserAuth {
  success: boolean;
  user: IUser;
}
