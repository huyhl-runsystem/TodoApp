import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/IUser";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
  setRefreshTokenToCookie,
} from "../utils/refresh_token";
import { IAuth } from "../interfaces/IAuth";
import axiosInstance from "../api/axios";
import { IUserLogin } from "../interfaces/IUserLogin";


interface IStateAuth extends IAuth {
  isLoading?: boolean;
}

const initialState: IStateAuth = {
  success: false,
  data: {
    user: {
      _id: "",
      email: "",
      full_name: "",
      role: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
    access_token: getAccessTokenFromCookie(),
    refresh_token: getRefreshTokenFromCookie(),
  },
  message: "",
  status: 0,
  isLoading: false,
};

export const loginAsync = createAsyncThunk(
  "posts/login",
  async (body: IUserLogin, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IAuth> =
        await axiosInstance.post<IStateAuth>("/auth/login", body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshAccessTokenAsync = createAsyncThunk<
  AxiosResponse<IAuth>,
  { refresh_token: string }
>("auth/refreshAccessToken", async (payload, thunkAPI) => {
  try {
    const response: AxiosResponse<IAuth> = await axiosInstance.post(
      "/auth/refresh-token",
      { refresh_token: payload.refresh_token }
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearAccessToken: (state) => {
      state.data.access_token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { access_token, refresh_token, user } = action.payload.data.data;
        state.isLoading = false;
        state.data.access_token = action.payload.data.data.access_token;
        setAccessTokenCookie(action.payload.data.data.access_token, 1);
        setRefreshTokenToCookie(action.payload.data.data.refresh_token);
        state.data.user = action.payload.data.data.user as IUser;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message as string;
      })
      .addCase(refreshAccessTokenAsync.fulfilled, (state, action) => {
        const { access_token, refresh_token } = action.payload.data.data;
        setAccessTokenCookie(action.payload.data.data.access_token, 1);
        setRefreshTokenToCookie(action.payload.data.data.refresh_token);
        state.data.access_token = action.payload.data.data.access_token;
        state.data.refresh_token = action.payload.data.data.refresh_token;
      })
      .addCase(refreshAccessTokenAsync.rejected, (state, action) => {
        state.message = action.error.message as string;
      });
  },
});

export default loginSlice.reducer;
export const { clearAccessToken } = loginSlice.actions;