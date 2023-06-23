import { DataContext } from "../context/DataContext";
import { ThemeContext } from "../context/ThemeContext";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { decodedToken, token, postImg, setPostImg, setFlag, flag } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    const d = new Date()
    const actualDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    try {
        const formData = new FormData();
        formData.append("image", postImg);
        formData.append("user_id", decodedToken._id);
        formData.append("title", title);
        formData.append("text", text);
        formData.append("timestamp", actualDate);
        await axios.post("http://localhost:8080/posts", formData, 
        {headers: {
          'Authorization': `Bearer ${token}`,
        }})
    } catch (error) {
        console.error(error)
    }
    setTitle("");
    setText("");
    setPostImg(null);
    setFlag(!flag);
    }

  const fileData = () => {
    if (postImg)
    return (
    <Typography variant="h5">{postImg.name}</Typography>
    );
    }

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
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
          <Box 
          component="form" 
          noValidate
          >
          <label htmlFor="upload-photo">
              <input  style={{ display: 'none' }} 
              id="upload-photo"  
              name="upload-photo"  
              type="file"
              onChange={(e) => setPostImg(e.target.files[0])}
              />
              <Box sx={{p: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
          }}>
            {postImg ? fileData() : <Typography variant="h5">placeholder image name</Typography>}
              <Button 
                  component="span"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mt: 2, mb: 2, width: "75%" }}>
                  <AddPhotoAlternateRoundedIcon sx={{ mr: 1}}/>
                  <Typography fontFamily="Poppins">Choose pic</Typography>
              </Button>
              </Box>
          </label>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3, mb: 2, width: "50%" }}
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
