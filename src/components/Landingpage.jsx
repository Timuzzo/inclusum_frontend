import { CssBaseline, Box, ThemeProvider, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Typewriter from "typewriter-effect";
import "../Typewriter.css";

export default function Landingpage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

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
      </Container>
    </ThemeProvider>
  );
}
