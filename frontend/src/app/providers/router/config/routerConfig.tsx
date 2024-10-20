import { AuthLayout } from "@/app/layouts/AuthLayout";
import { createBrowserRouter } from "react-router-dom";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { appRoutes } from "@/shared/const/routes";

export const router = createBrowserRouter([
  {
<<<<<<< HEAD
    path: appRoutes.auth(),
=======
    path: "/",
>>>>>>> 0e373a5d793c896994ea620a62d2e1a3464afa70
    element: <AuthLayout />,
    children: [{ path: appRoutes.auth(), element: <AuthorizationPage /> }],
  },
]);
