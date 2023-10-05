import React from "react";
import { createContext, useState } from "react";

interface LoadingContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: () => void;
  hideLoading: () => void;
}

const initialLoadingContex: LoadingContextInterface = {
  isLoading: false,
  setIsLoading: () => null,
  showLoading: () => null,
  hideLoading: () => null,
};

export const LoadingContext =
  createContext<LoadingContextInterface>(initialLoadingContex);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(
    initialLoadingContex.isLoading
  );
  const showLoading = () => {
    setIsLoading(true);
  };
  const hideLoading = () => {
    setIsLoading(false);
  };
  return (
    <LoadingContext.Provider
      value={{
        setIsLoading,
        isLoading,
        showLoading,
        hideLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
