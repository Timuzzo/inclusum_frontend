import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MyAccount from "./components/MyAccount";
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
        <Route
          path="/myaccount"
          element={token ? <MyAccount/> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
