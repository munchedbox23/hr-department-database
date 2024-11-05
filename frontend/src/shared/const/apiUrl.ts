interface IApiUrl {
  baseUrl: string;
  authBaseUrl: string;
  auth: Record<string, string>;
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://51.250.47.202:8080/api",
  authBaseUrl: "https://norma.nomoreparties.space/api",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refreshToken: "/auth/token",
    userData: "/auth/user",
  },
};
