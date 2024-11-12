import { getCookie } from "@/shared/lib/cookie/cookieRequest";
import { fetchWithRefresh } from "@/shared/lib/requests/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserAuth } from "../types/types";
import { apiUrl } from "@/shared/const/apiUrl";

export const checkUserAuth = createAsyncThunk<IUserAuth, void>(
  "user/getAuthUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithRefresh<IUserAuth>(
        `${apiUrl.baseUrl}${apiUrl.auth.userData}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.success) {
        return response;
      } else {
        return rejectWithValue("User check failed");
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as IUser | null,
    isAuthChecked: false,
    isRequestLoading: false,
    isRequestFailed: false,
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.isAuthChecked = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isRequestLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isRequestFailed = false;
        state.isRequestLoading = false;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isRequestFailed = true;
        state.isAuthChecked = true;
        state.isRequestLoading = false;
        console.error(action.payload);
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
