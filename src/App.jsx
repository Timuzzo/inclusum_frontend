<<<<<<< HEAD
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
=======
import {useContext } from "react";
>>>>>>> main
import "./App.css";
import {ThemeProvider, CssBaseline} from "@mui/material";
import Signup from "./components/Signup";
import Login from "./components/Login";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
        />
      </Routes>
    </>
=======
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const {theme} = useContext(ThemeContext);
  return (
    <div>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Login />
        <Signup />
      </ThemeProvider>
    </div>
>>>>>>> main
  );
}

export default App;
