import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import { getCookie } from "@/shared/lib/cookie/cookieRequest";

interface IUserAuth {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.authBaseUrl,
  }),
  endpoints: (builder) => ({
    checkUserAuth: builder.query<IUserAuth, void>({
      query: () => ({
        url: apiUrl.auth.userData,
        method: "GET",
        headers: {
          authorization: "Bearer " + getCookie("accessToken"),
        },
      }),
    }),
  }),
});

export const { useCheckUserAuthQuery } = userApi;
