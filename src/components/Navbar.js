import { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useJwt } from "react-jwt";

export default function Navbar({ user, setUser }) {
  const { logout, token } = useContext(AuthContext);
  const {theme, themeToggle, setThemeToggle} = useContext(ThemeContext)
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    logout();
  };

  const handleClickTheme = () => {
    themeToggle ? setThemeToggle(false) : setThemeToggle(true)
  };

  const { decodedToken } = useJwt(token);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: "#3476AD"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Inclusum</Link>
          </Typography>
          <DarkModeRoundedIcon sx={{mr: 1, ml: 1}} onClick={handleClickTheme}/>
          {token !== null && (
            <>
              <span style={{ padding: "10px" }}>
                Hello, {decodedToken?.name}
              </span>
              <Button color="inherit" onClick={handleClickLogout}>
                Log out
              </Button>
            </>
          )}
          {token === null && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
