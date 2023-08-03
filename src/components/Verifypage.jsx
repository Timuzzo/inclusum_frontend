import {
  CssBaseline,
  Box,
  ThemeProvider,
  Container,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import Typewriter from "typewriter-effect";
import { useNavigate, useParams } from "react-router-dom";

export default function Verifypage() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id, verifytoken } = useParams();

  const handleVerification = async () => {
    await fetch(
      `https://inclusum.onrender.com/user/${_id}/verify/${verifytoken}`
    );
    navigate("/login");
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <DoneOutlineRoundedIcon />
        </Avatar>
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
            onClick={handleVerification}
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
