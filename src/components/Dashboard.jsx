import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useJwt } from "react-jwt";
import { useTranslation } from "react-i18next";
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

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { decodedToken } = useJwt(token);
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

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
    console.log("firing handleSubmit");
    e.preventDefault();

    const databody = {
      title: title,
      text: text,
      user_id: decodedToken._id,
    };

    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(databody),
    });

    setTitle("Please select category");
    setText("");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (token) {
      getData();
    }
  }, [token]);

  return (
    <>
      <div className="posts">
        {loading ? ( // Show loading message if loading is true
          <h1>{t('dashboard.loading')}...</h1>
        ) : (
          <>
            {posts.length ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  style={{ border: "2px solid black", margin: "10px" }}
                >
                  <h2>{post.title}</h2>
                  <p>{post.text}</p>
                </div>
              ))
            ) : (
              <h1 style={{ color: "red" }}>{t('dashboard.no_posts_found')}</h1>
            )}
          </>
        )}
      </div>
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
