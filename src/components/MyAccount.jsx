import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  CssBaseline,
  Box,
  ThemeProvider,
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";

export default function MyAccount() {
  const [avatar, setAvatar] = useState(null);

  const { decodedToken } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  const handleSubmitImage = async (e) => {
    console.log("fire handleSubmitImage");
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", avatar, avatar?.name);
      formData.append("user_id", decodedToken._id);
      await axios.post("http://localhost:8080/avatar/uploadavatar", formData);
    } catch (error) {
      //  setError(error);
      console.error(error);
    }
    console.log("In MyAccount avatar", avatar);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <img src={} /> */}
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmitImage}
            noValidate
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              autoFocus
              onChange={(e) => setAvatar(e.target.files[0])}
              InputLabelProps={{ shrink: true }}
              sx={{
                border: "2px solid #0f6B63",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2, mb: 2, width: "50%" }}
            >
              <Typography fontFamily="Poppins">
                {t("myaccount.upload")}
              </Typography>
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
