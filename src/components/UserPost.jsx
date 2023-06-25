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
  Box
} from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PlaceIcon from '@mui/icons-material/Place';
import { useTranslation } from "react-i18next";

export default function UserPost() {
  const [counterLike, setCounterLike] = useState(0)
  const [counterDislike, setCounterDislike] = useState(0)
  
  const { theme } = useContext(ThemeContext);
  const { loading, posts, getUserPosts, token, currentUser} = useContext(DataContext);
  const { t } = useTranslation();
  const handleCounterLike = () => {
    setCounterLike(counterLike + 1)
  }

  const handleCounterDislike = () => {
    setCounterDislike(counterDislike + 1)
  }


  useEffect(() => {}, [posts]);

  useEffect(() => {
    if (token) {
      getUserPosts();
    }
  }, [token]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mb: "150px" }}>
          {loading ? ( // Show loading message if loading is true
            <Typography>{t("user_post.loading")}...</Typography>
          ) : (
            <>
              {posts.length ? (
                posts.map((post) => (
                  <Card
                    sx={{ mt: 2, border: "2px solid #0f6B63" }}
                    key={post._id}
                  >
                    <CardHeader
                      avatar={currentUser?.avatar !== "" ? <Avatar src={currentUser?.avatar}/> : <AccountCircleIcon fontSize="large"/>}
                      action={counterLike >= 5 &&  counterLike > counterDislike ? 
                        <CheckCircleOutlineRoundedIcon
                          aria-label="verified"
                          color="success"
                          fontSize="large"
                        />
                      :
                      <CheckCircleOutlineRoundedIcon
                          aria-label="verified"
                          fontSize="large"
                        />
                      }
                      title={currentUser?.username}
                      subheader={`${t("user_post.posted")} ${post.timestamp}`}
                    />
                    <CardContent sx={{display: "flex", alignItems: "center", gap: "5px", p: "0 16px 0 16px"}}>
                      <PlaceIcon fontSize="small"/>
                      <Typography fontSize="14px">{currentUser?.city}</Typography>
                    </CardContent>
                    {post.imageURL ? <CardMedia
                      component="img"
                      position="cover"
                      height="auto"
                      width="320"
                      image={post?.imageURL}
                      alt="image"
                      sx={{pt: 1}}/>
                      :
                      <></>
                    }
                    <CardContent>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography variant="body2">{post.text}</Typography>
                    </CardContent>
                    <CardActions sx={{p: 1}}>
                      <Badge badgeContent={counterLike} color="secondary">
                        <IconButton aria-label="like" onClick={handleCounterLike}>
                          <ThumbUpAltRoundedIcon />
                        </IconButton>
                      </Badge>
                      <Badge badgeContent={counterDislike} color="secondary">
                        <IconButton aria-label="dislike" onClick={handleCounterDislike}>
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
                justifyContent: "center"
                }}>
                <Typography variant="h5" style={{ color: "red" }}>
                  {t("user_post.no_posts_found")}
                </Typography></Box>
              )}
            </>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}
