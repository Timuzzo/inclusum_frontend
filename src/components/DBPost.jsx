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
  Backdrop,
} from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PlaceIcon from "@mui/icons-material/Place";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";

export default function DBPost() {
  const [counterLike, setCounterLike] = useState(0);
  const [counterDislike, setCounterDislike] = useState(0);

  const { theme } = useContext(ThemeContext);
  const { mergedDBDataArray, currentUser, loading } = useContext(DataContext);

  const { t } = useTranslation();
  const filteredDBPosts = mergedDBDataArray?.filter((post) =>
    post?.stationName?.includes(currentUser?.city)
  );

  const handleCounterLike = () => {
    setCounterLike(counterLike + 1);
  };

  const handleCounterDislike = () => {
    setCounterDislike(counterDislike + 1);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mb: 3 }}>
          {loading ? (
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
          <>
            {filteredDBPosts?.map((post) => (
              <Card
                sx={{ mt: 2, border: "2px solid #0f6B63" }}
                key={post?.equipmentnumber}
              >
                <CardHeader
                  avatar={
                    <Avatar src="https://marketingportal.extranet.deutschebahn.com/resource/blob/9692854/85e5d516abe712affc4c29b6dc7d0a3d/Bild_06-data.png" />
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
                  {post?.description ? (
                    <Typography variant="body2">{post.description}</Typography>
                  ) : (
                    <></>
                  )}
                  {post.stateExplanation !== "not available" ? (
                    <Typography variant="body2">
                      {post.stateExplanation}
                    </Typography>
                  ) : (
                    <Typography variant="body2">No detailed information</Typography>
                  )}
                </CardContent>
                <CardActions
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "10px" }}>
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
                  </Box>
                  {counterLike >= 5 && counterLike > counterDislike ? (
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
                  )}
                </CardActions>
              </Card>
            ))}
          </>
        </Container>
      </ThemeProvider>
    </>
  );
}
