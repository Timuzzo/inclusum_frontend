import { CssBaseline, Box, ThemeProvider, Container, Button, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function Landingpage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          gap: "20px",
        }}
      >
        <Box
          component="img"
          sx={{ objectFit: "contain", width: "100%" }}
          alt="logo"
          src="/02_inclusum.png"
        />
        <Typewriter
          options={{
            strings: t("landingpage.slogan"),
            delay: 80,
            autoStart: true,
          }}
        />
        <Box sx={{display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"}}>
          <Button 
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/login")}
          sx={{width: "50%"}}>
            <Typography fontFamily="Poppins">
              {t("login.login")}
            </Typography>
          </Button>
          <Link
            onClick={() => navigate("/signup")}
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", mt: 1}}
          >
            {t("login.no_existing_account")}
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
