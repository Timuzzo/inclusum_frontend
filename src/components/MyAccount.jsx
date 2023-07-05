import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  CssBaseline,
  Box,
  ThemeProvider,
  Button,
  Typography,
  Avatar,
  Alert,
  AlertTitle,
  Backdrop,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Badge,
  Dialog,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import CircularIndeterminate from "./Spinner";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function MyAccount() {
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const {
    decodedToken,
    currentUser,
    findAndUpdateUser,
    posts,
    getUserPosts,
    token,
    flag,
    setFlag,
    loadingMyAccount,
  } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  const cities = require("../test.germancities.json");

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMsg(null);
    try {
      const formData = new FormData();
      formData.append("picture", avatar, avatar?.name);
      formData.append("user_id", decodedToken._id);
      const res = await axios.post(
        "https://inclusum.onrender.com/avatar/uploadavatar",
        formData
      );
      setMsg(res.data.msg);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
    findAndUpdateUser();
    setAvatar(null);
    setIsLoading(false);
  };

  const handleSubmitCity = async (e) => {
    e.preventDefault();
    setMsg("");
    if (city !== "" && city !== currentUser?.city) {
      const databody = {
        _id: decodedToken._id,
        city: city,
      };
      const data = await fetch(
        "https://inclusum.onrender.com/user/updateuser",
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
      setMsg(res.msg);
      setFlag(!flag);
    }
  };

  const errorHandling = () => {
    if (error === "Request failed with status code 500") {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("myaccount.uploadfailure")}</AlertTitle>
        </Alert>
      );
    }
  };

  const handleImgOpen = (event) => {
    if (open) setOpen(false);
    setCurrentImage(event.target.src);
    if (!open) setOpen(true);
    setCurrentImage(event.target.src);
  };

  const handleDeletePost = async (e) => {
    setMsg("");
    console.log("delete clicked");
    console.log("e.currentTarget.value", e.currentTarget.value);
    const res = await fetch(
      `https://inclusum.onrender.com/posts/${e.currentTarget.value}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await res.json();
    setMsg(response.msg);
    setFlag(!flag);
  };

  useEffect(() => {
    if (token) {
      getUserPosts();
    }
  }, [token, flag]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
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
          {loadingMyAccount ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
              invisible={true}
            >
              <CircularIndeterminate />
            </Backdrop>
          ) : (
            <>
              <Avatar
                src={currentUser?.avatar}
                sx={{ width: 100, height: 100, alignSelf: "center" }}
              />
              <Typography variant="h4" sx={{ alignSelf: "center" }}>
                {t("myaccount.greeting")}, {currentUser?.username}
              </Typography>
              <Box component="form" onSubmit={handleSubmitImage} noValidate>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {avatar ? (
                      <Typography
                        sx={{ maxWidth: "100%"}}
                        variant="h5"
                      >
                      {avatar.name.length > 30 ? `${avatar.name.slice(0,30)}...` : avatar.name}
                      </Typography>
                    ) : (
                      <Typography variant="h5">
                        {t("myaccount.changeavatar")}
                      </Typography>
                    )}
                    {msg === "image successfully saved" ? (
                      <Alert
                        severity="success"
                        variant="outlined"
                        color="secondary"
                      >
                        <AlertTitle>{t("myaccount.updatesuccess")}</AlertTitle>
                      </Alert>
                    ) : (
                      <></>
                    )}
                    {error ? errorHandling() : <></>}
                    <Button
                      component="span"
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ mt: 2, width: "75%" }}
                    >
                      <AddPhotoAlternateRoundedIcon sx={{ mr: 1 }} />
                      <Typography fontFamily="Poppins">
                        {t("myaccount.chooseavatar")}
                      </Typography>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ mt: 2, mb: 2, width: "75%" }}
                    >
                      <Typography fontFamily="Poppins">
                        {t("myaccount.upload")}
                      </Typography>
                    </Button>
                  </Box>
                </label>
              </Box>
              <Typography variant="h4" sx={{ alignSelf: "center" }}>
                {t("myaccount.my_city")}
              </Typography>
              <Box
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <PlaceIcon fontSize="large" />
                  <Typography variant="h5">{currentUser?.city}</Typography>
                </Box>
                {msg === "User updated successfully" ? (
                  <Alert
                    severity="success"
                    variant="outlined"
                    color="secondary"
                    sx={{ mt: 2 }}
                  >
                    <AlertTitle>{t("myaccount.updatesuccess")}</AlertTitle>
                  </Alert>
                ) : (
                  <></>
                )}
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmitCity}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "75%",
                  }}
                >
                  <Autocomplete
                    sx={{ mt: 2, width: "100%" }}
                    disablePortal
                    id="city"
                    options={cities}
                    getOptionLabel={(option) => option.name || ""}
                    renderOption={(props, option) => (
                      <li {...props} key={option._id.$oid}>
                        {option.name}
                      </li>
                    )}
                    fullWidth
                    noOptionsText={t("create_post.no_match")}
                    onChange={(e, newValue) => setCity(newValue?.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("create_post.city")}
                        helperText={t("create_post.please_select_the_city")}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    <Typography fontFamily="Poppins">
                      {t("myaccount.change_city")}
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <>
                <Box sx={{ alignSelf: "center" }}>
                  <Badge
                    badgeContent={posts.length ? posts.length : 0}
                    color="secondary"
                    style={{ fontSize: "15px" }}
                    showZero
                  >
                    <Typography variant="h4">
                      {t("myaccount.myposts")}
                    </Typography>
                  </Badge>
                </Box>
                <Box sx={{ alignSelf: "center", width: "75%" }}>
                  {msg === "User post successfully deleted" ? (
                    <Alert
                      severity="success"
                      variant="outlined"
                      color="secondary"
                    >
                      <AlertTitle>{t("myaccount.deletesuccess")}</AlertTitle>
                    </Alert>
                  ) : (
                    <></>
                  )}
                </Box>
                <Box>
                  {posts.length ? (
                    posts
                      .slice(0)
                      .reverse()
                      .map((post) => (
                        <Card
                          sx={{ mb: 2, border: "2px solid #0f6B63" }}
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
                            action={
                              <IconButton
                                onClick={handleDeletePost}
                                value={post._id}
                              >
                                <DeleteRoundedIcon />
                              </IconButton>
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
                            <Typography fontSize="14px">
                              {post?.city}
                            </Typography>
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
                          <CardActions
                            sx={{
                              p: 1,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: "10px" }}>
                              <Badge
                                badgeContent={post.likes}
                                color="secondary"
                              >
                                <IconButton aria-label="like" disabled>
                                  <ThumbUpAltRoundedIcon />
                                </IconButton>
                              </Badge>
                              <Badge
                                badgeContent={post.dislikes}
                                color="secondary"
                              >
                                <IconButton aria-label="dislike" disabled>
                                  <ThumbDownAltRoundedIcon />
                                </IconButton>
                              </Badge>
                            </Box>
                            {post.likes >= 5 && post.likes > post.dislikes ? (
                              <CheckCircleRoundedIcon
                                aria-label="verified"
                                color="success"
                                fontSize="large"
                              />
                            ) : (
                              <CheckCircleRoundedIcon
                                aria-label="verified"
                                fontSize="large"
                              />
                            )}
                          </CardActions>
                        </Card>
                      ))
                  ) : (
                    <></>
                  )}
                </Box>
              </>
            </>
          )}
          <Dialog open={open}>
            <img
              src={currentImage}
              onClick={handleImgOpen}
              style={{ cursor: "pointer" }}
              alt="currentImage"
            />
          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}
