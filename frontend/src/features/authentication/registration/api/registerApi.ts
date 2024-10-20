import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "@/shared/const/apiUrl";
import {
  IRegisterResponse,
  IRegisterRequest,
} from "../model/types/registerTypes";
import { setCookie } from "@/shared/lib/cookie/cookieRequest";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl.authBaseUrl,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body) => ({ url: apiUrl.auth.register, method: "POST", body }),
      async onQueryStarted(arg, { queryFulfilled }) {
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
  }),
});

export const { useRegisterMutation } = registerApi;
