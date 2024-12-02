interface IApiUrl {
  baseUrl: string;
  auth: Record<string, string>;
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://158.160.148.213:8080/api",
  auth: {
    login: "/login",
    register: "/register",
    logout: "/logout",
    refreshToken: "/token",
    userData: "/user",
  },
};
