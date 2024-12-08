interface IApiUrl {
  baseUrl: string;
  auth: Record<string, string>;
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://51.250.42.253:8080/api",
  auth: {
    login: "/login",
    register: "/register",
    logout: "/logout",
    refreshToken: "/token",
    userData: "/user",
  },
};
