import React from "react";
import { Button } from "antd";
import "../../style/Todo.css";
import { clearAllCookies } from "../../utils/refresh_token";
import { clearAccessToken } from "../../store/LoginReducer";
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, showLoading, hideLoading } = useLoading();
  const handleLogOut = () => {
    clearAllCookies();
    dispatch(clearAccessToken());
    navigate("/login");
  };
  useEffect(() => {
    isLoadingState ? showLoading() : hideLoading();
  }, [isLoadingState, showLoading, hideLoading]);

  return (
    <>
      {!isLoading && (
        <div className="todo-page">
          <Button onClick={handleLogOut}>Sign Out</Button>
          <SideBar>
            <TodoList />
          </SideBar>
        </div>
      )}
    </>
  );
}