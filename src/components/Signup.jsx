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
  AlertTitle,
  Autocomplete,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const { login } = useContext(AuthContext);

  const { theme, themeToggle } = useContext(ThemeContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const cities = require("../test.germancities.json");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setIsLoading(true);
    setError(null);

    const databody = {
      email: email,
      password: password,
      username: username,
      city: city,
      avatar: "",
      points: 0,
      verified: false,
    };

    const response = await fetch("https://inclusum.onrender.com/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(databody),
    });

    const data = await response.json();

    console.log("DATA", data);

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    } else {
      setIsLoading(false);
      setMsg(data.msg);
    }
  };

  const errorHandling = () => {
    if (error === "Email already in use, please provide different one.") {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("signup.existing_email")}</AlertTitle>
        </Alert>
      );
    } else if (error === "Please fill in all fields.") {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("signup.missing_field")}</AlertTitle>
        </Alert>
      );
    } else if (error === "Wrong format, please check your email address.") {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("signup.invalid_email")}</AlertTitle>
        </Alert>
      );
    } else if (
      error ===
      "Make sure to use at least 8 characters, one upper case, one lower, one number and one symbol"
    ) {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("signup.strong_password")}</AlertTitle>
        </Alert>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        <CssBaseline />
        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            invisible={true}
          >
            <CircularIndeterminate />
          </Backdrop>
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            {t("signup.signup")}
          </Typography>
          {error ? errorHandling() : <></>}
          {msg ? (
            <Alert severity="success" variant="outlined">
              <AlertTitle>{t("signup.email_verification")}</AlertTitle>
            </Alert>
          ) : (
            <></>
          )}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {themeToggle ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("signup.email")}
                  name="email"
                  autoComplete="email"
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
                  label={t("signup.password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputProps={{
                    style: { WebkitBoxShadow: "0 0 0 100px #121212 inset" },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label={t("signup.username")}
                  name="username"
                  autoComplete="username"
                  inputProps={{
                    style: { WebkitBoxShadow: "0 0 0 100px #121212 inset" },
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <Autocomplete
                  disablePortal
                  sx={{ mt: 2 }}
                  id="city"
                  options={cities}
                  getOptionLabel={(option) => option.name || ""}
                  fullWidth
                  renderInput={(params, index) => (
                    <TextField
                      {...params}
                      required
                      label={t("signup.city")}
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  )}
                />
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("signup.email")}
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t("signup.password")}
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
                  label={t("signup.username")}
                  name="username"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <Autocomplete
                  disablePortal
                  sx={{ mt: 2 }}
                  id="city"
                  options={cities}
                  getOptionLabel={(option) => option.name || ""}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id.$oid}>
                      {option.name}
                    </li>
                  )}
                  fullWidth
                  noOptionsText={t("create_post.no_match")}
                  onChange={(e, newValue) => setCity(newValue.name)}
                  renderInput={(params) => (
                    <TextField required {...params} label={t("signup.city")} />
                  )}
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
            sx={{ mt: 3, mb: 2, width: "50%" }}
          >
            <Typography fontFamily="Poppins">{t("signup.signup")}</Typography>
          </Button>
          <Link
            onClick={() => navigate("/login")}
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            {t("signup.existing_account")}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
