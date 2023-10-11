import React from "react";
import { Skeleton } from "antd";
import { useContext } from "react";
import { LoadingContext } from "../Provider/LoadingProvider";

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};

export default function Loading({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <>
          <Skeleton />
          {children}
        </>
      )}
    </>
  );

};

