import { AuthForm } from "@/widgets/AuthForm";
import { useLocation } from "react-router-dom";

export const AuthorizationPage = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("register");
  return (
    <AuthForm
      title={isRegisterPage ? "Регистрация" : "Личный кабинет"}
      initialTab={isRegisterPage ? 1 : 0}
    />
  );
};
