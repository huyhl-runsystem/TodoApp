import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../api/axios";
import { ITodoResponse } from "../interfaces/ITodoResponse";

interface IStateTodo extends ITodoResponse{
    isLoading?: boolean;
}

enum TodoStatus {
  Pending = 1,
  Doing = 2,
  Completed = 3,
}

const initialState : IStateTodo = {
    success : false,
    data: {
      to_dos:[  {
        _id: "",
        title: "",
        desc: "",
        status: TodoStatus.Pending,
        user_id: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
    }],
      total: 0,
  },
    message : "",
    status :0,
    isLoading : false,
}

export const viewAllTodoAsync = createAsyncThunk<
  AxiosResponse<ITodoResponse>,
  { accessToken: string; _id: string }
>("todo/viewAllTodo", 
  async ({ accessToken, _id }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ITodoResponse> = await axiosInstance.get(
      `/todo/list/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return rejectWithValue(error)}
});

export const createTodoAsync = createAsyncThunk<
  AxiosResponse<ITodoResponse>,
  { accessToken: string;
    id_user: string; 
    title: string; 
    desc: string; 
    status: number }
>("todo/createTodo",
  async ({ accessToken, id_user , title, desc, status }, { rejectWithValue, dispatch }) => {
    try {
      const response: AxiosResponse<ITodoResponse> = await axiosInstance.post(
        "/todo",
        {
          id_user,
          title,
          desc,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(viewAllTodoAsync({ accessToken, _id : id_user }));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk<
  AxiosResponse<ITodoResponse>,
  { accessToken: string; todoId: string }
>("todo/deleteTodo", 
  async ({ accessToken, todoId }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ITodoResponse> = await axiosInstance.delete(
        `/todo/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(viewAllTodoAsync.pending, (state) => {
          state.isLoading = true;
          state.success = false; 
          state.status = 0;
        })
        .addCase(viewAllTodoAsync.fulfilled, (state, action) => {
          const {data} = action.payload.data;
          state.isLoading = false;
          state.success = true;
          state.data = data;
        })
        .addCase(viewAllTodoAsync.rejected, (state) => {
          state.isLoading = false;
          state.success = false;
        });
    },
  });
  
  export default todoSlice.reducer;
    
