import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ThemeProvider,
  CssBaseline,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useJwt } from "react-jwt";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { logout, token } = useContext(AuthContext);
  const { theme, themeToggle, setThemeToggle } = useContext(ThemeContext);
  const { decodedToken } = useJwt(token);
  const { currentUser, setFlag, flag } = useContext(DataContext);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const languages = {
    en: { nativeName: "English" },
    de: { nativeName: "Deutsch" },
  };

  const [anchorLanguage, setAnchorLanguage] = useState();
  const [anchorAccount, setAnchorAccount] = useState();
  const openLanguage = Boolean(anchorLanguage);
  const openAccount = Boolean(anchorAccount);

  const handleClickLanguage = (event) => {
    setAnchorLanguage(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setAnchorLanguage(null);
  };

  const handleClickAccount = (event) => {
    setAnchorAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorAccount(null);
  };

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    setAnchorAccount(false);
    setFlag(false);
    navigate("/login");
    logout();
  };

  const handleClickTheme = () => {
    themeToggle ? setThemeToggle(false) : setThemeToggle(true);
  };

  useEffect(() => {}, [flag]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#3476AD" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ mr: 2, flexGrow: 1 }}
            >
              <Link to="/">Inclusum</Link>
            </Typography>
            <LanguageIcon
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={handleClickLanguage}
            />
            <Menu
              anchorEl={anchorLanguage}
              onClose={handleCloseLanguage}
              open={openLanguage}
            >
              {Object.keys(languages).map((lng) => (
                <MenuItem key={lng} onClick={() => i18n.changeLanguage(lng)}>
                  {languages[lng].nativeName}
                </MenuItem>
              ))}
            </Menu>

            {themeToggle ? (
              <WbSunnyRoundedIcon
                sx={{ mr: 2, cursor: "pointer" }}
                onClick={handleClickTheme}
              />
            ) : (
              <DarkModeRoundedIcon
                sx={{ mr: 2, cursor: "pointer" }}
                onClick={handleClickTheme}
              />
            )}
            {token !== null && (
              <>
                <Typography sx={{ mr: 2 }}>
                  {t("navbar.greeting")}, {currentUser?.username}
                </Typography>
                {currentUser?.avatar !== "" ? 
                (
                <Avatar sx={{ cursor: "pointer" }} onClick={handleClickAccount} aria-label="avatar" src={currentUser?.avatar}/>
                ) 
                : 
                <AccountCircleIcon sx={{ cursor: "pointer" }} onClick={handleClickAccount}/>}
                <Menu
                  anchorEl={anchorAccount}
                  onClose={handleCloseAccount}
                  open={openAccount}
                >
                  <MenuItem>
                    <Typography color="inherit" onClick={handleClickLogout}>
                      {t("navbar.logout")}
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      color="inherit"
                      onClick={() => navigate("/myaccount")}
                    >
                      {t("navbar.myaccount")}
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography color="inherit" onClick={() => navigate("/")}>
                      {t("navbar.dashboard")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {token === null && (
              <>
                <AccountCircleIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleClickAccount}
                />
                <Menu
                  anchorEl={anchorAccount}
                  onClose={handleCloseAccount}
                  open={openAccount}
                >
                  <MenuItem>
                    <Typography
                      color="inherit"
                      onClick={() => navigate("/login")}
                    >
                      {t("navbar.login")}
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography
                      color="inherit"
                      onClick={() => navigate("/signup")}
                    >
                      {t("navbar.signup")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
