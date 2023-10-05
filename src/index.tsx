import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "../src/store/store";
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './Provider/LoadingProvider';
import Loading from './constants/Loading'
import Register from './pages/Register/RegisterForm';
import Login from './pages/Login/LoginForm';
// import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <Provider store={store}>
          <Loading>
            {/* <LanguageSwitch/> */}
            <App/>
          </Loading>
        </Provider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);