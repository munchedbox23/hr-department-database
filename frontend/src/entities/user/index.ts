export {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from "./api/authApi";

export type {
  IUser,
  IUserAuth,
  IUserLogin,
  IUserLogout,
  IUserRegister,
  IUserResponse,
  IRefreshTokenResponse,
} from "./model/types/types";

import userSlice from "./model/slice/authSlice";
export { checkUserAuth } from "./model/slice/authSlice";
export { userSlice };
