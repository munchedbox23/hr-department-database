import { combineReducers } from "@reduxjs/toolkit";
import { loginApi } from "@/features/authentication/login";
import { registerApi } from "@/features/authentication/registration";

export const rootReducer = combineReducers({
  [loginApi.reducerPath]: loginApi.reducer,
  [registerApi.reducerPath]: registerApi.reducer,
});
