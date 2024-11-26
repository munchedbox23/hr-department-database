import React, { createContext, useContext, useEffect } from "react";
import { useAppSelector } from "@/app/providers/StoreProvider";
import { useGetEmployeesQuery } from "@/entities/employee";
import { useGetDepartmentQuery } from "@/entities/department";
import { useGetOrdersQuery } from "@/entities/orders";
import { useGetStaffingQuery } from "@/entities/staffing";
import { useGetTimeSheetQuery } from "@/entities/time-sheet";
import { IUserWithRole } from "@/entities/user";
import { useGetTripsQuery } from "@/entities/trips";
import { useGetVacationsQuery } from "@/entities/vacations";

const UserContext = createContext<IUserWithRole | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);
  const { refetch: refetchEmployees } = useGetEmployeesQuery();
  const { refetch: refetchDepartments } = useGetDepartmentQuery();
  const { refetch: refetchOrders } = useGetOrdersQuery();
  const { refetch: refetchStaffing } = useGetStaffingQuery();
  const { refetch: refetchTimeSheet } = useGetTimeSheetQuery();
  const { refetch: refetchTrips } = useGetTripsQuery();
  const { refetch: refetchVacations } = useGetVacationsQuery();

  useEffect(() => {
    refetchEmployees();
    refetchDepartments();
    refetchOrders();
    refetchStaffing();
    refetchTimeSheet();
    refetchTrips();
    refetchVacations();
  }, [user?.role, refetchEmployees, refetchDepartments, refetchOrders]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
