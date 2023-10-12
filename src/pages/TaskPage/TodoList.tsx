import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { viewAllTodoAsync } from "../../store/TodoReducer";
import { ITodoResponse } from "../../interfaces/ITodoResponse";
import  TodoForm  from "./TodoForm";
import SideBar from "../Common/Sidebar";
import { useLoading } from "../../hook/Loading";


const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { access_token  } = useSelector(
    (state: RootState) => state.login.data  );

  const { _id } = useSelector(
    (state: RootState) => state.login.data.user );

  const { data } = useSelector(
    (state: RootState) => state.todo  );

  useEffect(() => {
    if (access_token) {
        dispatch(viewAllTodoAsync({ accessToken : access_token, _id: _id }));
      }
    }, [dispatch]);

    const { isLoading: isLoadingState } = useSelector(
      (state: RootState) => state.login
    );
  
    const { isLoading, showLoading, hideLoading } = useLoading();
    useEffect(() => {
      isLoadingState ? showLoading() : hideLoading();
    }, [isLoadingState, showLoading, hideLoading]);
  
    return (
      <>
        {!isLoading && (
          <div className="todo-page">
            <SideBar>
            <div>
              <h2>Todo List</h2>
              {data.to_dos.map((todo) => (
                <div key={todo._id}>
                  <TodoForm todo={todo} />
                </div>
              ))}
            </div>
            </SideBar>
          </div>
        )}
      </>
    );
};

export default TodoList;