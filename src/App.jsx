import { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

// function App() {
//   const {theme} = useContext(ThemeContext);
//   return (
//     <div>
//       <ThemeProvider theme={theme}>
//       <CssBaseline />
//         <Login />
//         <Signup />
//       </ThemeProvider>
//     </div>

//   );
// }

export default App;
