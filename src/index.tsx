import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./Provider/LoadingProvider";
import Loading from "./hook/Loading";
import LoginForm from "./pages/Login/LoginForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <Provider store={store}>
          <Loading>
            <App />
          </Loading>
        </Provider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
