// features/auth/authSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from './authService';
import { LoginData, RegisterData } from './authService';

interface User {
  id: string;
  email: string;
  fullName: string;
  urlImage: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (data: authService.LoginData, { dispatch }) => {
    try {
      dispatch(loginStart());
      const user = await authService.login(data);
      dispatch(loginSuccess({ user }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (data: authService.RegisterData, { dispatch }) => {
    try {
      dispatch(registerStart());
      const user = await authService.register(data);
      dispatch(registerSuccess({ user }));
      return user; // Trả về giá trị user từ action thunk
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw error; // Ném lại lỗi để cho phép xử lý lỗi ở các thành phần gọi action
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
