import { useContext, useState } from "react";
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
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserPost from "./UserPost";
import CreatePost from "./CreatePost";
import DBPost from "./DBPost";
import { ControlContext } from "../context/ControlContext";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [alignment, setAlignment] = useState("user_posts");
  const [toggle, setToggle] = useState(false)

  const { handleClickOpen, handleClickClose, open, setOpen } =
    useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const { t } = useTranslation();

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
          <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          aria-label="togglefeed"
          >
          <ToggleButton value="user_posts" onClick={handleClickToggle1}>
            <Typography fontFamily="Poppins">{t("dashboard.user_post")}</Typography>
          </ToggleButton>
          <ToggleButton value="DB_posts" onClick={handleClickToggle2}>
          <Typography fontFamily="Poppins">{t("dashboard.db_post")}</Typography>
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
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}
