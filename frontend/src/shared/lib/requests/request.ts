import { apiUrl } from "@/shared/const/apiUrl";
import { IRefreshTokenResponse, TTokenError } from "@/shared/types/types";
import { getCookie, setCookie } from "../cookie/cookieRequest";

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

export const request = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  return checkResponse<T>(response);
};

export const refreshToken = (): Promise<IRefreshTokenResponse> => {
  return request(`${apiUrl.authBaseUrl}${apiUrl.auth.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err: unknown) {
    if ((err as TTokenError).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      const headers: Record<string, string> = {
        "Content-type": "application/json",
      };
      headers.authorization = refreshData.accessToken;
      const res = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
