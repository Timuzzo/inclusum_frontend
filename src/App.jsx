import {useContext } from "react";
import "./App.css";
import {ThemeProvider, CssBaseline} from "@mui/material";
import Signup from "./components/Signup";
import Login from "./components/Login";
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
  );
}

export default App;
