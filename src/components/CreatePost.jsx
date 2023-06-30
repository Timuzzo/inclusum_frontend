import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";
import { ControlContext } from "../context/ControlContext";
import { useState, useContext } from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  ThemeProvider,
  Container,
  Typography,
  MenuItem,
  Alert,
  AlertTitle,
  Backdrop,
  Autocomplete
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CircularIndeterminate from "./Spinner";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    decodedToken,
    token,
    postImg,
    setPostImg,
    setFlag,
    flag,
    currentUser,
  } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const { handleClickClose } = useContext(ControlContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMsg(null);
    const d = new Date();
    const month = () => {
      if (d.getMonth() < 10) {
        return `0${d.getMonth() + 1}`;
      } else {
        return d.getMonth() + 1;
      }
    };
    const hour = () => {
      if (d.getHours() < 10) {
        return `0${d.getHours()}`;
      } else {
        return d.getHours();
      }
    };
    const min = () => {
      if (d.getMinutes() < 10) {
        return `0${d.getMinutes()}`;
      } else {
        return d.getMinutes();
      }
    };
    const actualDate = `${d.getDate()}.${month()}.${d.getFullYear()} ${hour()}:${min()}`;
    try {
      const formData = new FormData();
      formData.append("image", postImg);
      formData.append("user_id", decodedToken._id);
      formData.append("title", title);
      formData.append("text", text);
      formData.append("timestamp", actualDate);
      formData.append("city", currentUser.city);
      formData.append("username", currentUser.username);
      formData.append("avatar", currentUser.avatar);
      const res = await axios.post(
        "https://inclusum.onrender.com/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(res.data.msg);
    } catch (error) {
      setError(error.response.data.error);
      console.error(error);
    }
    setFlag(!flag);
    setPostImg(null);
    setTitle("");
    setText("");
    setIsLoading(false);
  };

  if (msg) {
    setTimeout(() => {
      handleClickClose();
    }, 2000);
  }

  const fileData = () => {
    if (postImg) return <Typography variant="h5">{postImg.name}</Typography>;
  };

  const { t } = useTranslation();

  const disruptions = [
    {
      value: t("create_post.elevators"),
    },
    {
      value: t("create_post.toilets"),
    },
    {
      value: t("create_post.sliding_revolving_doors"),
    },
    {
      value: t("create_post.escalators"),
    },
    {
      value: t("create_post.displays"),
    },
    {
      value: t("create_post.others"),
    },
  ];

  const errorHandling = () => {
    if (error === "Please fill in all fields") {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("create_post.please_fill_in_all_fields")}</AlertTitle>
        </Alert>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
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
            {t("create_post.create_malfunction_info")}
          </Typography>
          {error ? errorHandling() : <></>}
          {msg === "post successfully created" ? (
            <Alert severity="success" variant="outlined" color="secondary">
              <AlertTitle>
                {t("create_post.post_created_successfully")}
              </AlertTitle>
            </Alert>
          ) : (
            <></>
          )}
          <Autocomplete
            disablePortal
            id="city"
            // options={}
            fullWidth
            renderInput={(params) => <TextField {...params} label={t("create_post.city")} helperText={t("create_post.please_select_the_city")}/>}
          />
          <TextField
            fullWidth
            id="category"
            label={t("create_post.category")}
            select
            helperText={t("create_post.please_select_category")}
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
            label={t("create_post.text")}
            multiline
            rows={10}
            helperText={t("create_post.please_describe_the_issue")}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <Box noValidate>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => setPostImg(e.target.files[0])}
              />
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {postImg ? fileData() : <></>}
                <Button
                  component="span"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2, width: "250px" }}
                >
                  <AddPhotoAlternateRoundedIcon sx={{ mr: 1 }} />
                  <Typography fontFamily="Poppins">
                    {t("create_post.chooseimage")}
                  </Typography>
                </Button>
              </Box>
            </label>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mb: 2, width: "250px" }}
          >
            <Typography fontFamily="Poppins">
              {t("create_post.create")}
            </Typography>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
