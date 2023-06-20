import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { DataContext } from "../context/DataContext";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  ThemeProvider,
  Container,
  Typography,
  MenuItem,
} from "@mui/material";
import UserPost from "./UserPost";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { theme } = useContext(ThemeContext);
  const {decodedToken, token } = useContext(DataContext);

  const {t} = useTranslation()

  const disruptions = [
    {
      value: t('dashboard.elevators'),
    },
    {
      value: t('dashboard.toilets'),
    },
    {
      value: t('dashboard.sliding_revolving_doors'),
    },
    {
      value: t('dashboard.escalators'),
    },
    {
      value: t('dashboard.displays'),
    },
    {
      value: t('dashboard.others'),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const databody = {
      title: title,
      text: text,
      user_id: decodedToken._id,
    };

    await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(databody),
    });
    setTitle("")
    setText("");
  };

  return (
    <>
    <UserPost />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography component="h1" variant="h5">
              {t('dashboard.create_malfunction_info')}
            </Typography>
            <TextField
              fullWidth
              id="category"
              label={t('dashboard.category')}
              select
              helperText={t('dashboard.please_select_category')}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            >
              {disruptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="text"
              label={t('dashboard.text')}
              multiline
              rows={10}
              helperText={t('dashboard.please_describe_the_issue')}
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 3, mb: 2, width: "50%" }}
            >
              <Typography fontFamily="Poppins">{t('dashboard.create')}</Typography>
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
