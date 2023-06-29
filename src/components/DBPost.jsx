import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
  Badge,
  Box,
} from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PlaceIcon from "@mui/icons-material/Place";
import { useTranslation } from "react-i18next";

export default function DBPost() {
  const [counterLike, setCounterLike] = useState(0);
  const [counterDislike, setCounterDislike] = useState(0);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  const { mergedDBDataArray } = useContext(DataContext);

  const { t } = useTranslation();

  const handleCounterLike = () => {
    setCounterLike(counterLike + 1);
  };

  const handleCounterDislike = () => {
    setCounterDislike(counterDislike + 1);
  };

  console.log("mergedDBDataArray on DB Post", mergedDBDataArray);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mb: "150px" }}>
          {/* {loading ? ( // Show loading message if loading is true
    <Typography>{t("user_post.loading")}...</Typography>
    ) : ( */}
          <>
            {mergedDBDataArray?.length ? (
              mergedDBDataArray.map((post) => (
                <Card
                  sx={{ mt: 2, border: "2px solid #0f6B63" }}
                  key={post?.equipmentnumber}
                >
                  <CardHeader
                    avatar={
                      <Avatar src="https://marketingportal.extranet.deutschebahn.com/resource/blob/9692854/85e5d516abe712affc4c29b6dc7d0a3d/Bild_06-data.png" />
                    }
                    action={
                      counterLike >= 5 && counterLike > counterDislike ? (
                        <CheckCircleOutlineRoundedIcon
                          aria-label="verified"
                          color="success"
                          fontSize="large"
                        />
                      ) : (
                        <CheckCircleOutlineRoundedIcon
                          aria-label="verified"
                          fontSize="large"
                        />
                      )
                    }
                    title="Deutsche Bahn"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      p: "0 16px 0 16px",
                    }}
                  >
                    <PlaceIcon fontSize="small" />
                    <Typography fontSize="14px">{post?.stationName}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6">{post.type}</Typography>
                    {post.stateExplanation !== "not available" ? (
                      <Typography variant="body2">
                        {post.stateExplanation}
                      </Typography>
                    ) : (
                      <Typography>No detailed information</Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 1 }}>
                    <Badge badgeContent={counterLike} color="secondary">
                      <IconButton aria-label="like" onClick={handleCounterLike}>
                        <ThumbUpAltRoundedIcon />
                      </IconButton>
                    </Badge>
                    <Badge badgeContent={counterDislike} color="secondary">
                      <IconButton
                        aria-label="dislike"
                        onClick={handleCounterDislike}
                      >
                        <ThumbDownAltRoundedIcon />
                      </IconButton>
                    </Badge>
                  </CardActions>
                </Card>
              ))
            ) : (
              <Box
                sx={{
                  marginTop: 25,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" style={{ color: "red" }}>
                  {t("user_post.no_posts_found")}
                </Typography>
              </Box>
            )}
          </>
          {/* )} */}
        </Container>
      </ThemeProvider>
    </>
  );
}
