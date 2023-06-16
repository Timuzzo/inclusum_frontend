import { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useJwt } from "react-jwt";

export default function Navbar({ user, setUser }) {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

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
            <Link to="/">Inclusum</Link>
          </Typography>
          {token !== null && (
            <>
              <span style={{ padding: "10px" }}>
                Hello, {decodedToken?.name}
              </span>
              <Button color="inherit" onClick={handleClick}>
                Log out
              </Button>
            </>
          )}
          {token === null && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
