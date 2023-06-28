import { useContext } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import CloseIcon from "@mui/icons-material/Close";
import UserPost from "./UserPost";
import CreatePost from "./CreatePost";
import DBPost from "./DBPost";
import { ControlContext } from "../context/ControlContext";

export default function Dashboard() {
  const { handleClickOpen, handleClickClose, open, setOpen } =
    useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserPost />
        <DBPost />
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
