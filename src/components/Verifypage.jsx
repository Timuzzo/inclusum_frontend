import {
  CssBaseline,
  Box,
  ThemeProvider,
  Container,
  Button,
  Typography,
} from "@mui/material";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

export default function Verifypage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
  };

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
        <DoneOutlineRoundedIcon />
        {/* <Box
          component="img"
          sx={{ objectFit: "contain", width: "100%" }}
          alt="logo"
          src="/02_inclusum.png"
        /> */}
        <Typewriter
          options={{
            strings: t("verifypage.success_message"),
            delay: 80,
            autoStart: true,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/login")}
            sx={{ width: "50%" }}
          >
            <Typography fontFamily="Poppins">
              {t("verifypage.verify_button")}
            </Typography>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
