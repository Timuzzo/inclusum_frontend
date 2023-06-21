import { useState, useContext } from "react";
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
import SearchIcon from '@mui/icons-material/Search';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import CloseIcon from '@mui/icons-material/Close';
import UserPost from "./UserPost";
import CreatePost from "./CreatePost";
import axios from "axios";
import { DataContext } from "../context/DataContext";

export default function Dashboard() { 
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState(null);

  const { decodedToken } = useContext(DataContext); 
  const { theme } = useContext(ThemeContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitImage = async (e) => {
    console.log('fire handleSubmitImage')
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", avatar, avatar?.name);
      formData.append("user_id", decodedToken._id);
      await axios.post("http://localhost:8080/avatar/uploadavatar", formData)
    } catch (error) {
      //  setError(error);
      console.error(error)
    }
  }
  
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserPost/>
    <Dialog open={open} fullScreen>
    <DialogTitle sx={{ m: 0, p: 2 }}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
      <CreatePost/>
    </Dialog>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "#3476AD"}}>
        <Toolbar>
          <Fab color="secondary" aria-label="add" 
          sx={{position: 'absolute',
          zIndex: 1,
          top: -30,
          left: 0,
          right: 0,
          margin: '0 auto'}}
          onClick={handleClickOpen}>
            <CreateRoundedIcon />
          </Fab>
          <Box 
          sx={{ flexGrow: 1 }}
          />
  <form onSubmit={handleSubmitImage}>
    <input type="file" onChange={(e) => setAvatar(e.target.files[0])}>
  </input>
  <button type="submit">
    Submit
  </button>
  </form>
          <IconButton color="inherit" >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </>
  );
}
