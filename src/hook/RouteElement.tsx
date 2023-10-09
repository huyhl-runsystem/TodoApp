import React from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LoginForm from "../pages/Login/LoginForm";
import { path } from "../api/routes";
import { getFromCookie } from "../utils/refresh_token";
import RegisterForm from "../pages/Register/RegisterForm";
import Todo from "../pages/TaskPage/Todo";

export default function RouteElements() {
  const accessToken = getFromCookie("access_token");
  const isPrivate = Boolean(accessToken);
  console.log(isPrivate);
  const isPublic = Boolean(accessToken);

  const routeElements = useRoutes([
   {
      path: "",
      element: isPrivate ?  <Outlet /> : <LoginForm />,
      children: [
        {
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
      element: !isPrivate ? <Navigate to="/todolist" /> : <Outlet />,
      children: [
        {
          path: path.todoListPath,
          element: isPrivate ? <Todo /> : null,
        },
      ],
    },

  ]);

  return routeElements;
}