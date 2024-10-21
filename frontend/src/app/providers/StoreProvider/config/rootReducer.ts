import { combineReducers } from "@reduxjs/toolkit";
import { loginApi } from "@/features/authentication/login";
import { registerApi } from "@/features/authentication/registration";
import { userApi } from "@/entities/user/api/userApi";

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
});
