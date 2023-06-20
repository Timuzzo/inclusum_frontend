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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";

export default function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const { theme, themeToggle } = useContext(ThemeContext);

  const navigate = useNavigate()
  const {t} = useTranslation()
  

  const handleSubmit = async (e) => {
    console.log("firing handleSubmit");
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const databody = {
      email: email,
      password: password,
      username: username,
      city: city,
      avatar: "",
      points: 0,
    };

    const response = await fetch("http://localhost:8080/user/signup", {
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
    setCity("");
    setPassword("");
    setUsername("");
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('signup.signup')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {themeToggle ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('signup.email')}
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
                label={t('signup.email')}
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('signup.password')}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('signup.username')}
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label={t('signup.city')}
              name="city"
              autoComplete="city"
              autoFocus
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Box>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3, mb: 2, width: "50%" }}
          >
            <Typography fontFamily="Poppins">
            {t('signup.signup')}
            </Typography>
          </Button>
          <Link onClick={() => navigate("/login")} variant="body2" color="primary" sx={{cursor: "pointer"}}>
            {t('signup.existing_account')}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
