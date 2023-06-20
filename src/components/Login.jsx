import { useState, useContext } from "react";

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
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { theme, themeToggle } = useContext(ThemeContext);

  const {t} = useTranslation()

  const handleSubmit = async (e) => {
    console.log("firing handleSubmit");
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const databody = {
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:8080/user/login", {
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

    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? <CircularIndeterminate /> : <></>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {t('login.login')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {themeToggle ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('login.email')}
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                  style: { WebkitBoxShadow: "0 0 0 100px #121212 inset" },
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('login.email')}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('login.password')}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, mb: 2, width: "50%" }}
          >
            <Typography fontFamily="Poppins">{t('login.login')}</Typography>
          </Button>
          <Link href="#" variant="body2" color="primary">
            {t('login.no_existing_account')}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
