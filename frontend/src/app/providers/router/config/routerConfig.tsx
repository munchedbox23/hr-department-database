import { AuthLayout } from "@/app/layouts/AuthLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MainLayout } from "@/app/layouts/MainLayout";
import { WelcomePage } from "@/pages/WelcomePage";
import { OnlyAuth, OnlyUnAuth } from "../ui/WithProtectedRoute";
import { EmployeesTablePage } from "@/pages/Employees";

export const router = createBrowserRouter([
  {
    path: appRoutes.home(),
    element: <MainLayout />,
    children: [
      { index: true, element: <OnlyAuth component={<WelcomePage />} /> },
      {
        path: appRoutes.employees(),
        element: <OnlyAuth component={<EmployeesTablePage />} />,
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
    element: <Navigate to={appRoutes.auth()} replace />,
  },
]);
