import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ user, setUser }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inclusum
          </Typography>
          {user !== null && (
            <Button color="inherit" onClick={handleClick}>
              Log out
            </Button>
          )}
          {user === null && (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Signup</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
