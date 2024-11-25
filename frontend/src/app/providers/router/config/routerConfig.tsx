import { AuthLayout } from "@/app/layouts/AuthLayout";
import { createBrowserRouter } from "react-router-dom";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MainLayout } from "@/app/layouts/MainLayout";
import { WelcomePage } from "@/pages/WelcomePage";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { EmployeesTablePage } from "@/pages/Employees";
import { StaffingSchedulePage } from "@/pages/StaffingSchedule";
import { WorkHoursPage } from "@/pages/WorkHoursPage";
import { OrdersPage } from "@/pages/OrderPage";
import { TripsPage } from "@/pages/TripsPage";
import { VacationPage } from "@/pages/VacationPage";
import { DepartmentPage } from "@/pages/DepartmentPage";

export const router = createBrowserRouter([
  {
    path: appRoutes.home(),
    element: <OnlyAuth component={<MainLayout />} />,
    children: [
      { index: true, element: <OnlyAuth component={<WelcomePage />} /> },
      {
        path: appRoutes.employees(),
        element: <OnlyAuth component={<EmployeesTablePage />} />,
      },
      {
        path: appRoutes.staffing(),
        element: <OnlyAuth component={<StaffingSchedulePage />} />,
      },
      {
        path: appRoutes.attendance(),
        element: <OnlyAuth component={<WorkHoursPage />} />,
      },
      {
        path: appRoutes.laborContracts(),
        element: <OnlyAuth component={<OrdersPage />} />,
      },
      {
        path: appRoutes.businessTrips(),
        element: <OnlyAuth component={<TripsPage />} />,
      },
      {
        path: appRoutes.vacations(),
        element: <OnlyAuth component={<VacationPage />} />,
      },
      {
        path: appRoutes.department(),
        element: <OnlyAuth component={<DepartmentPage />} />,
      },
    ],
  },
  {
    path: appRoutes.auth(),
    element: <OnlyUnAuth component={<AuthLayout />} />,
    children: [
      {
        index: true,
        element: <OnlyUnAuth component={<AuthorizationPage />} />,
      },
    ],
  },
  {
    path: appRoutes.notFound(),
    element: <NotFoundPage />,
  },
]);
