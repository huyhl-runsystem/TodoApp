import React from "react";
import "../../style/Todo.css";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../Common/Sidebar";
import { AppDispatch, RootState } from "../../store/store";
import { useLoading } from "../../hook/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoList from "./TodoList";

export default function TodoPage() {
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
            <TodoList />
          </SideBar>
        </div>
      )}
    </>
  );
}