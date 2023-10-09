import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import LoginForm from "../pages/Login/LoginForm";
import { path } from "../api/routes";

import RegisterForm from "../pages/Register/RegisterForm";
import Home from "../pages/Common/Home";
import TodoList from "../pages/TaskPage/Todo";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

export default function useRouteElements() {

  const routeElements = useRoutes([
    {
      path: "",
      element: <PublicRoute />,
      children: [
        {
          index : true,
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
          path: path.homepagePath,
          element: <Home />,
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
