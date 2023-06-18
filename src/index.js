import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import AuthContextProvider from "./context/AuthContext";
import './translation'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContext>
          <App />
        </ThemeContext>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
