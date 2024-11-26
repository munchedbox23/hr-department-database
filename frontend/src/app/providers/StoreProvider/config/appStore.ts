import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { authApi } from "@/entities/user/api/authApi";
import { employeesApi } from "@/entities/employee";
import { ordersApi } from "@/entities/orders";
import { tripsApi } from "@/entities/trips";
import { vacationApi } from "@/entities/vacations";
import { staffingApi } from "@/entities/staffing";
import { timeSheetApi } from "@/entities/time-sheet";
import { departmentApi } from "@/entities/department";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      employeesApi.middleware,
      ordersApi.middleware,
      tripsApi.middleware,
      vacationApi.middleware,
      staffingApi.middleware,
      timeSheetApi.middleware,
      departmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
