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
    MenuItem,
    Menu
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CircularIndeterminate from "./Spinner";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PlaceIcon from "@mui/icons-material/Place";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function MyAccount () {
const [msg, setMsg] = useState(null)
const [error, setError] = useState(null);
const [avatar, setAvatar] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [counterLike, setCounterLike] = useState(0);
const [counterDislike, setCounterDislike] = useState(0);
const [open, setOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(null);
const [anchorEl, setAnchorEl] = useState();
const openMenu = Boolean(anchorEl);

const { decodedToken, currentUser, findAndUpdateUser, posts, getUserPosts, token, flag, loadingMyAccount} = useContext(DataContext);
const { theme } = useContext(ThemeContext);

const {t} = useTranslation()

const handleSubmitImage = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError(null)
    setMsg(null)
    try {
        const formData = new FormData();
        formData.append("picture", avatar, avatar?.name);
        formData.append("user_id", decodedToken._id);
        const res = await axios.post("https://inclusum.onrender.com/avatar/uploadavatar", formData)
        setMsg(res.data.msg)
    } catch (error) {
        setError(error.message);
        console.error(error)
    }
    findAndUpdateUser()
    setAvatar(null)
    setIsLoading(false)
    }

    const errorHandling = () => {
    if (error === "Request failed with status code 500") {
        return (
        <Alert severity="error" variant="outlined">
        <AlertTitle>{t('myaccount.uploadfailure')}</AlertTitle>
        </Alert>)
    }
    }

const handleCounterLike = (e) => {
    console.log(e.target);
    setCounterLike(counterLike + 1);
    };

    const handleCounterDislike = (e) => {
    console.log(e.target);
    setCounterDislike(counterDislike + 1);
    };

    const handleImgOpen = (event) => {
    if (open) setOpen(false);
    setCurrentImage(event.target.src);
    if (!open) setOpen(true);
    setCurrentImage(event.target.src);
    };

const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };

const handleCloseMenu = () => {
setAnchorEl(null);
};

useEffect(() => {
    if (token) {
        getUserPosts();
    }
    }, [token, flag]);

return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Container component="main" maxWidth="xs" sx={{mt: 3, mb: 3, display: "flex", flexDirection: "column", gap: "20px"}}>
    {isLoading ? 
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
    open = {true}
    invisible = {true}
    >
    <CircularIndeterminate/>
    </Backdrop> 
    : 
    <></>}
    {loadingMyAccount ? 
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
    open = {true}
    invisible = {true}
    >
    <CircularIndeterminate/>
    </Backdrop> 
    : 
    <></>}
    <Avatar 
    src={currentUser?.avatar}
    sx={{ width: 100, height: 100, alignSelf: "center" }}
    />
    <Typography variant="h4" sx={{alignSelf: "center" }}>{t('myaccount.greeting')}, {currentUser?.username}</Typography>
    <Box 
    component="form" 
    onSubmit={handleSubmitImage} 
    noValidate
    >
    <label htmlFor="upload-photo">
        <input  style={{ display: 'none' }} 
        id="upload-photo"  
        name="upload-photo"  
        type="file"
        onChange={(e) => setAvatar(e.target.files[0])}
        />
        <Box sx={{p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }}>
        {avatar ? 
        <Typography sx={{overflow: "hidden", maxWidth: "100%", mb: 1}} variant="h5">{avatar.name}</Typography> 
        : 
        <Typography sx={{mb: 1}}variant="h5">{t('myaccount.changeavatar')}</Typography>
        }
        {msg === 'image successfully saved'? 
        <Alert severity="success" variant="outlined" color="secondary">
            <AlertTitle>{t('myaccount.updatesuccess')}</AlertTitle>
        </Alert> 
        :
        <></>
        }
        {error ? errorHandling() : <></>}
        <Button 
            component="span"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, width: "75%" }}>
            <AddPhotoAlternateRoundedIcon sx={{ mr: 1}}/>
            <Typography fontFamily="Poppins">{t('myaccount.chooseavatar')}</Typography>
        </Button>
        <Button 
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, mb: 2, width: "75%" }}>
            <Typography fontFamily="Poppins">{t('myaccount.upload')}</Typography>
        </Button>
        </Box>
    </label>
    </Box>
        <>
        <Box sx={{alignSelf: "center"}}>
            <Badge badgeContent={posts.length ? posts.length : 0} color="secondary" style={{ fontSize: "15px" }} showZero>
                <Typography variant="h4" >{t('myaccount.myposts')}</Typography>
            </Badge>
        </Box>
        <Box>
            {posts
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
                    action={
                    <IconButton onClick={handleClickMenu}>
                        <MoreVertRoundedIcon/>
                    </IconButton>}
                    title={post?.username}
                    subheader={`${t("user_post.posted")} ${post.timestamp}`}
                />
                <Menu
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                open={openMenu}
                >
                    <MenuItem>
                    {t("myaccount.delete")}
                    </MenuItem>
                    <MenuItem>
                    {t("myaccount.edit")}
                    </MenuItem>
                </Menu>
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
                        sx={{ pt: 1, objectFit: "cover", cursor: "pointer" }}
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
                    <Badge badgeContent={counterLike} color="secondary">
                    <IconButton
                        aria-label="like"
                        onClick={handleCounterLike}
                    >
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
                    {
                    counterLike >= 5 && counterLike > counterDislike ? (
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
        </Box>
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
)}