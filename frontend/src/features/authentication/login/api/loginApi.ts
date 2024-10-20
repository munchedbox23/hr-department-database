import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import { ILoginRequest, ILoginResponse } from "../model/types/loginTypes";
import { setCookie } from "@/shared/lib/cookie/cookieRequest";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.authBaseUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({ url: apiUrl.auth.login, method: "POST", body }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            path: "/",
          });
          setCookie("refreshToken", data.refreshToken, { path: "/" });
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
