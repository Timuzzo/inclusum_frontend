import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  ThemeProvider,
  Container,
  Typography,
  Backdrop,
  Alert,
  AlertTitle
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { theme, themeToggle } = useContext(ThemeContext);
  const { setFlag, flag } = useContext(DataContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const databody = {
      email: email,
      password: password,
    };

    const response = await fetch("https://inclusum.onrender.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(databody),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
    }
    setFlag(!flag);
    setEmail("");
    setPassword("");
  };

  const errorHandling = () => {
    if (error === "Please fill all fields") {
      return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>{t("login.missing_field")}</AlertTitle>
      </Alert>)
    } else if (error === "Incorrect email") {
      return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>{t("login.incorrect_email")}</AlertTitle>
      </Alert>) 
    } else if (error === "Incorrect password")
      return (
      <Alert severity="error" variant="outlined">
        <AlertTitle>{t("login.incorrect_password")}</AlertTitle>
      </Alert>) 
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" 
      sx={{ display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", 
      minHeight: '70vh' }}>
      {isLoading ? 
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open = {true}
        invisible = {true}
      >
        <CircularIndeterminate/>
      </Backdrop> 
      : 
      <></>}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 1}}>
            {t("login.login")}
          </Typography>
          {error? errorHandling() : <></>}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {themeToggle ? (
              <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("login.email")}
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 100px #121212 inset" },
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("login.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                style: { WebkitBoxShadow: "0 0 0 100px #121212 inset" },
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
              </>
            ) : (
              <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("login.email")}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("login.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            </>
            )}
          </Box>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, mb: 2, width: "50%" }}
          >
            <Typography fontFamily="Poppins">{t("login.login")}</Typography>
          </Button>
          <Link
            onClick={() => navigate("/signup")}
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            {t("login.no_existing_account")}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
