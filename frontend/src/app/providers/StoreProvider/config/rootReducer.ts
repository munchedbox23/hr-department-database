import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/entities/user/api/authApi";
import { userSlice } from "@/entities/user";
import { employeesApi } from "@/entities/employee";
import { ordersApi } from "@/entities/orders";
import { tripsApi } from "@/entities/trips";
import { vacationApi } from "@/entities/vacations";
import { staffingApi } from "@/entities/staffing";
import { timeSheetApi } from "@/entities/time-sheet";
import { departmentApi } from "@/entities/department";

export const rootReducer = combineReducers({
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [tripsApi.reducerPath]: tripsApi.reducer,
  [vacationApi.reducerPath]: vacationApi.reducer,
  [staffingApi.reducerPath]: staffingApi.reducer,
  [timeSheetApi.reducerPath]: timeSheetApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
});
