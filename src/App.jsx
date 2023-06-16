import { useState, useContext } from "react";
import "./App.css";
import {ThemeProvider, CssBaseline, GlobalStyles} from "@mui/material";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const {theme} = useContext(ThemeContext);
  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Login />
        <Signup />
      </ThemeProvider>
    </>
  );
}

export default App;
