import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getFromCookie } from "../utils/refresh_token";
import { path } from "../api/routes";

export default function PublicRoute() {
  const accessToken = getFromCookie("access_token");
  const isPublic = Boolean(!accessToken);
  return isPublic ? <Outlet /> : <Navigate to={path.todoListPath} />;
}
