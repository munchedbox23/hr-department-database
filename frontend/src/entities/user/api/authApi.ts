import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import {
  IUserLogin,
  IUserRegister,
  IUserResponse,
} from "../model/types/types";
import {
  setCookie,
  getCookie,
  deleteCookie,
} from "@/shared/lib/cookie/cookieRequest";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.baseUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, IUserLogin>({
      query: (body) => ({
        url: apiUrl.auth.login,
        method: "POST",
        body: JSON.stringify(body),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
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
    register: builder.mutation<IUserResponse, IUserRegister>({
      query: (body) => ({
        url: apiUrl.auth.register,
        method: "POST",
        body: JSON.stringify(body),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setCookie("accessToken", data.accessToken.split("Bearer ")[1], {
            path: "/",
          });
          setCookie("refreshToken", data.refreshToken, { path: "/" });
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: apiUrl.auth.logout,
        method: "POST",
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
