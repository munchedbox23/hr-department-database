import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/entities/user/api/authApi";
import { userSlice } from "@/entities/user";
import { employeesApi } from "@/entities/employee";

export const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer, 
});
