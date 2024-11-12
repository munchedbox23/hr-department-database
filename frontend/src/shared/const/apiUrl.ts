interface IApiUrl {
  baseUrl: string;
  authBaseUrl: string;
  auth: Record<string, string>;
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://130.193.45.106:8080/api",
  authBaseUrl: "https://norma.nomoreparties.space/api",
  auth: {
    login: "/login",
    register: "/register",
    logout: "/logout",
    refreshToken: "/token",
    userData: "/user",
  },
};
