import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
  Badge,
  Box,
  Dialog,
  Backdrop,
} from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CircularIndeterminate from "./Spinner";
import PlaceIcon from "@mui/icons-material/Place";

export default function UserPost() {
  // const [counterLike, setCounterLike] = useState(0);
  // const [counterDislike, setCounterDislike] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { getUserPosts, token, flag, cityPosts, loading, currentUser } = useContext(DataContext);

  // const handleCounterLike = (e) => {
  //   console.log(e.target);
  //   setCounterLike(counterLike + 1);
  // };

  // const handleCounterDislike = (e) => {
  //   console.log(e.target);
  //   setCounterDislike(counterDislike + 1);
  // };

  const handleImgOpen = (event) => {
    if (open) setOpen(false);
    setCurrentImage(event.target.src);
    if (!open) setOpen(true);
    setCurrentImage(event.target.src);
  };

  async function updateLike(e) {
    const databody = {
      likes: 0,
    };
    const data = await fetch(
      `https://inclusum.onrender.com/posts/likes/${e.currentTarget.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(databody),
      }
    );
    const res = await data.json();
    console.log("resLike", res);
  }

  async function updateDislike(e) {
    const databody = {
      dislikes: 0,
    };
    const data = await fetch(
      `https://inclusum.onrender.com/posts/dislikes/${e.currentTarget.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(databody),
      }
    );
    const res = await data.json();
    console.log("resDislike", res);
  }

  useEffect(() => {
    if (token) {
      getUserPosts();
    }
    setIsLoading(false);
  }, [token, flag]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mb: "150px" }}>
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
              {cityPosts.length ? (
                cityPosts
                  .slice(0)
                  .reverse()
                  .map((post) => (
                    <Card
                      sx={{ mt: 2, border: "2px solid #0f6B63" }}
                      key={post._id}
                    >
                      <CardHeader
                        avatar={
                          post?.avatar !== "" ? (
                            <Avatar src={post?.avatar} />
                          ) : (
                            <AccountCircleIcon fontSize="large" />
                          )
                        }
                        title={post?.username}
                        subheader={post?.timestamp}
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
                        <Typography fontSize="14px">{post?.city}</Typography>
                      </CardContent>
                      {post.imageURL ? (
                        <>
                          <CardMedia
                            onClick={handleImgOpen}
                            component="img"
                            height="300"
                            width="300"
                            image={post?.imageURL}
                            alt="image"
                            sx={{
                              pt: 1,
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2">{post.text}</Typography>
                      </CardContent>
                      <CardActions sx={{ p: 1, display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", gap: "10px"}}>
                      {currentUser._id === post.user_id ? 
                      <Badge badgeContent={post.likes} color="secondary">
                      <IconButton
                          aria-label="like"
                          disabled={true}
                      >
                          <ThumbUpAltRoundedIcon />
                      </IconButton>
                      </Badge>
                      :
                      <Badge badgeContent={post.likes} color="secondary">
                      <IconButton
                        aria-label="like"
                        onClick={updateLike}
                        value={post._id}
                      >
                          <ThumbUpAltRoundedIcon />
                      </IconButton>
                      </Badge>
                      }
                    {currentUser._id === post.user_id ? 
                    <Badge badgeContent={post.dislikes} color="secondary">
                    <IconButton
                        aria-label="dislike"
                        disabled={true}
                    >
                        <ThumbDownAltRoundedIcon />
                    </IconButton>
                    </Badge>
                    :
                    <Badge badgeContent={post.dislikes} color="secondary">
                    <IconButton
                        aria-label="dislike"
                        onClick={updateDislike}
                        value={post._id}
                    >
                        <ThumbDownAltRoundedIcon />
                    </IconButton>
                    </Badge>
                    }
                    </Box>
                    {
                    post.likes >= 5 && post.likes > post.dislikes ? (
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
                  ))
              ) : <></>
              }
            </>
          <Dialog open={open}>
            <img
              src={currentImage}
              onClick={handleImgOpen}
              style={{ cursor: "pointer" }}
            />
          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}
