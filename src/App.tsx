import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RouteElement from "./constants/RouteElement";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { refreshAccessTokenAsync } from "./store/LoginReducer";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const refreshToken = useSelector(
    (state: RootState) => state.login.data.refresh_token
  );

  useEffect(() => {
    async function refreshAccessToken() {
      await dispatch(refreshAccessTokenAsync({ refresh_token: refreshToken }));
    }
    if (refreshToken) {
      refreshAccessToken();
    }

    const intervalId = setInterval(refreshAccessToken, 10 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, refreshToken]);
  const routeElements = RouteElement();

  return <>{routeElements}</>;
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;