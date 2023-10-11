import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getFromCookie } from "../utils/refresh_token";
import { path } from "../api/routes";

export default function PrivateRoute() {
  const accessToken = getFromCookie("access_token");
  const isPrivate = Boolean(accessToken);

  return isPrivate ? <Outlet /> : <Navigate to={path.loginPath} />;
}
