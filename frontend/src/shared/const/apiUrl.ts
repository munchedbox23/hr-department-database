interface IApiUrl {
  baseUrl: string;
  auth: {
    login: string;
  };
}

export const apiUrl: IApiUrl = {
  baseUrl: "http://localhost:8080",
  auth: {
    login: "/auth/login",
  },
};
