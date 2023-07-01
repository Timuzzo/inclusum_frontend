import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  CssBaseline,
  Box,
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  ToggleButtonGroup,
  ToggleButton,
  Container,
  Typography,
  Backdrop,
  Badge,
} from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserPost from "./UserPost";
import CreatePost from "./CreatePost";
import DBPost from "./DBPost";
import CircularIndeterminate from "./Spinner";
import { ControlContext } from "../context/ControlContext";
import { DataContext } from "../context/DataContext";
import { useTranslation } from "react-i18next";


export default function Dashboard() {
  const [alignment, setAlignment] = useState("user_posts");
  const [toggle, setToggle] = useState(false)

  const { handleClickOpen, handleClickClose, open} = useContext(ControlContext);
  const { cityPosts, loading, mergedDBDataArray, currentUser} = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

  const filteredDBPosts = mergedDBDataArray?.filter((post) =>
  post?.stationName?.includes(currentUser?.city)
);

  const handleClickToggle1 = () => {
      setToggle(false)
      setAlignment("user_posts");
  };
  const handleClickToggle2 = () => {
      setToggle(true)
      setAlignment("DB_posts");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mt: "20px", display: "flex", justifyContent: "center" }}>
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
          <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          aria-label="togglefeed"
          >
          <ToggleButton value="user_posts" onClick={handleClickToggle1} sx={{p:2}}>
          <Badge badgeContent={cityPosts?.length ? cityPosts.length : 0} color="secondary" showZero>
            <Typography fontFamily="Poppins" sx={{p:0.5}}>{t("dashboard.user_post")}</Typography>
          </Badge>
          </ToggleButton>
          <ToggleButton value="DB_posts" onClick={handleClickToggle2} sx={{p:2}}>
            <Badge badgeContent={filteredDBPosts?.length ? filteredDBPosts.length : 0} color="secondary" showZero>
              <Typography fontFamily="Poppins" sx={{p:0.5}}>{t("dashboard.db_post")}</Typography>
            </Badge>
          </ToggleButton>
          </ToggleButtonGroup>
        </Container>
        {toggle? <DBPost /> : <UserPost />}
        <Dialog open={open} fullScreen>
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <IconButton
              aria-label="close"
              onClick={handleClickClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <CreatePost />
        </Dialog>
        {!toggle?
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0, backgroundColor: "#3476AD" }}
        >
          <Toolbar>
            <Fab
              color="secondary"
              aria-label="add"
              sx={{
                position: "absolute",
                zIndex: 1,
                top: -30,
                left: 0,
                right: 0,
                margin: "0 auto",
              }}
              onClick={handleClickOpen}
            >
              <CreateRoundedIcon />
            </Fab>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar> 
        : 
        <></>}
      </ThemeProvider>
    </>
  );
}
