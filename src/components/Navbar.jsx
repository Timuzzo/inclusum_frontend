import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ThemeProvider,
  CssBaseline,
  Menu, 
  MenuItem
} from "@mui/material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useJwt } from "react-jwt";
import { useTranslation } from "react-i18next";

export default function Navbar({ user, setUser }) {
  const { logout, token } = useContext(AuthContext);
  const {theme, themeToggle, setThemeToggle} = useContext(ThemeContext)
  const navigate = useNavigate();

  const {t, i18n} = useTranslation()

  const languages = {
    en: {nativeName: 'English'},
    de: {nativeName: 'Deutsch'}
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setAnchorEl(null);
  };

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
          <LanguageIcon 
          sx={{mr: 1, ml: 1, cursor: "pointer"}}
          onClick={handleClickLanguage}
          />
          <Menu
            anchorEl={anchorEl}
            onClose={handleCloseLanguage}
            open={open}
          >
            {Object.keys(languages).map(lng => (
              <MenuItem onClick={() => i18n.changeLanguage(lng)}>{languages[lng].nativeName}</MenuItem>
            ))}
          </Menu>
          
          {themeToggle? <WbSunnyRoundedIcon sx={{mr: 1, cursor: "pointer"}} onClick={handleClickTheme}/> : <DarkModeRoundedIcon sx={{mr: 1, cursor: "pointer"}} onClick={handleClickTheme}/>}
          {token !== null && (
            <>
              <span style={{ padding: "10px" }}>
              {t('navbar.greeting')}, {decodedToken?.name}
              </span>
              <Button color="inherit" onClick={handleClickLogout}>
              {t('navbar.logout')}
              </Button>
            </>
          )}
          {token === null && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
              {t('navbar.login')}
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
              {t('navbar.signup')}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
