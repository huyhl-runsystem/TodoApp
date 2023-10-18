import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import LoginForm from "../pages/Login/LoginForm";
import { path } from "../api/routes";
import RegisterForm from "../pages/Register/RegisterForm";
import Profile from "../pages/Profile/Profile";
import TodoList from "../pages/TaskPage/TodoList";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <PublicRoute />,
      children: [
        {
          index: true,
          path: path.loginPath,
          element: <LoginForm />,
        },
        {
          path: path.registerPath,
          element: <RegisterForm />,
        },
      ],
    },
    {
      path: "",
      element: <PrivateRoute />,
      children: [
        {
          path: path.profilePath,
          element: <Profile />,
        },
        {
          path: path.todoListPath,
          element: <TodoList />,
        },
      ],
    },
  ]);
  return routeElements;
}
