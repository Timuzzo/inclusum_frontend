import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
    CssBaseline,
    Box,
    ThemeProvider,
    Button,
    Container,
    Typography,
    Avatar,
    Alert,
    AlertTitle
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function MyAccount () {
const [msg, setMsg] = useState(null)
const [error, setError] = useState(null);
const [avatar, setAvatar] = useState(null);

const { decodedToken, currentUser, findAndUpdateUser} = useContext(DataContext);
const { theme } = useContext(ThemeContext);

const {t} = useTranslation()

const handleSubmitImage = async (e) => {
    e.preventDefault();
    setError(null)
    setMsg(null)
    try {
        const formData = new FormData();
        formData.append("picture", avatar, avatar?.name);
        formData.append("user_id", decodedToken._id);
        const res = await axios.post("http://localhost:8080/avatar/uploadavatar", formData)
        setMsg(res.data.msg)
    } catch (error) {
        setError(error.message);
        console.error(error)
    }
    findAndUpdateUser()
    setAvatar(null)
    }

    const errorHandling = () => {
    if (error === "Request failed with status code 500") {
        return (
        <Alert severity="error" variant="outlined">
        <AlertTitle>{t('myaccount.uploadfailure')}</AlertTitle>
        </Alert>)
    }
    }

return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Container component="main" maxWidth="xs" sx={{mt: 3, display: "flex", flexDirection: "column", gap: "30px"}}>
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
    </Container>
    </ThemeProvider>
    </>
)}