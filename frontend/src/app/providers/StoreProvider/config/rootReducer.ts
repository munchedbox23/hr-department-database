import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/entities/user/api/authApi";
import { userSlice } from "@/entities/user";
import { employeesApi } from "@/entities/employee";
import { ordersApi } from "@/entities/orders";
import { tripsApi } from "@/entities/trips";

export const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [tripsApi.reducerPath]: tripsApi.reducer,
});
