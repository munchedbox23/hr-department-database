import { AuthLayout } from "@/app/layouts/AuthLayout";
import { createBrowserRouter } from "react-router-dom";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { appRoutes } from "@/shared/const/routes";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MainLayout } from "@/app/layouts/MainLayout";
import { WelcomePage } from "@/pages/WelcomePage";

export const router = createBrowserRouter([
  {
    path: appRoutes.home(),
    element: <MainLayout />,
    children: [{ index: true, element: <WelcomePage /> }],
  },
  {
    path: appRoutes.auth(),
    element: <AuthLayout />,
    children: [{ path: appRoutes.auth(), element: <AuthorizationPage /> }],
  },
  {
    path: appRoutes.notFound(),
    element: <NotFoundPage />,
  },
]);
