import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
import { AuthContext } from "./context/AuthContext";
import Landingpage from "./components/Landingpage";
import React from "react";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/myaccount"
          element={token ? <MyAccount /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
