import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResgitserResponse, IUserRegister } from "../interfaces/IUserRegister";
import { AxiosResponse } from "axios";
import axiosInstance from "../api/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  error: "",
};
export const registerAsync = createAsyncThunk<
  AxiosResponse<IResgitserResponse>,
  IUserRegister
>("posts/register", async (body: IUserRegister, thunkAPI) => {
  try {
    const response: AxiosResponse<IResgitserResponse> =
      await axiosInstance.post("/users/", body);
    return response;
  } catch (error: any) {
    alert(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setSuccessRegister: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        alert("Register Susscess");
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message as string;
      });
  },
});

export default registerSlice.reducer;
export const { setSuccessRegister } = registerSlice.actions;
