import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/entities/user/api/authApi";
import { userSlice } from "@/entities/user";

export const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
});
