import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchWithRefresh } from "@/shared/lib/requests/request";
import { apiUrl } from "@/shared/const/apiUrl";
import { getCookie } from "@/shared/lib/cookie/cookieRequest";
import { IUserAuth } from "../model/types/types";

const baseQueryWithRefresh = async ({
  url,
  method,
}: {
  url: string;
  method: string;
}) => {
  const token = getCookie("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetchWithRefresh<IUserAuth>(url, {
    method,
    headers,
  });

  return response;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: async ({ url, method }) => {
    try {
      const result = await baseQueryWithRefresh({ url, method });
      return { data: result };
    } catch (err) {
      return { error: err };
    }
  },
  endpoints: (builder) => ({
    getUserAuth: builder.query<IUserAuth, void>({
      query: () => ({
        url: `${apiUrl.authBaseUrl}${apiUrl.auth.userData}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserAuthQuery } = userApi;
