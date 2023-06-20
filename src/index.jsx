import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import AuthContextProvider from "./context/AuthContext";
import DataContext from './context/DataContext';
import './translation'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DataContext> 
            <ThemeContext>
              <App />
            </ThemeContext>
        </DataContext>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
