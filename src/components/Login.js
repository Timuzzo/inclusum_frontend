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

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { theme, themeToggle } = useContext(ThemeContext);

  const { theme, themeToggle } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const databody = {
      email: email,
      password: password,
    };

    await fetch("http://localhost:8080/user/login", {
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
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={theme}>
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {themeToggle ? (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                label="Email Address"
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, mb: 2, width: "50%" }}
          >
            <Typography fontFamily="Poppins">Login</Typography>
          </Button>
          <Link href="#" variant="body2" color="primary">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
