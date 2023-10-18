import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Home() {
  const { isLoading } = useSelector((state: RootState) => state.login);

  return <h2>Profile page</h2>;
}
