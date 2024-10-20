interface IApiUrl {
  baseUrl: string;
  authBaseUrl: string;
  auth: Record<string, string>;
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://localhost:8080",
  authBaseUrl: "https://norma.nomoreparties.space/api",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refreshToken: "/auth/token",
    userData: "/auth/user",
  },
};
