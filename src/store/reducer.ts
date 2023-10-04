import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IUser } from "../interfaces/IUser";
import {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setAccessTokenCookie,
  setRefreshTokenToCookie,
} from "./refresh_token";
import { IAuth } from "../interfaces/IAuth";
import axiosInstance from "../api/axios";
import { IUserLogin } from "../interfaces/IUserLogin";

const initialState: IAuth = {
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
};

export const loginAsync = createAsyncThunk(
  "posts/login",
  async (body: IUserLogin, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IAuth> =
        await axiosInstance.post<IAuth>("/api/auth/login", body);

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
      "/api/auth/refresh-token",
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

      .addCase(loginAsync.fulfilled, (state, action) => {
        state.data.access_token = action.payload.data.data.access_token;
        setAccessTokenCookie(action.payload.data.data.access_token, 1);
        setRefreshTokenToCookie(action.payload.data.data.refresh_token);
        state.data.user = action.payload.data.data.user as IUser;
      })
      .addCase(refreshAccessTokenAsync.fulfilled, (state, action) => {
        setAccessTokenCookie(action.payload.data.data.access_token, 1);
        setRefreshTokenToCookie(action.payload.data.data.refresh_token);
        state.data.access_token = action.payload.data.data.access_token;
        state.data.refresh_token = action.payload.data.data.refresh_token;
      });
  },
});

export default loginSlice.reducer;
export const { clearAccessToken } = loginSlice.actions;