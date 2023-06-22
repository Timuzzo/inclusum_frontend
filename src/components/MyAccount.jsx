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

const [avatar, setAvatar] = useState(null);
// const [alert, setAlert] = useState(false)

const { decodedToken, currentUser } = useContext(DataContext);
const { theme } = useContext(ThemeContext);

const {t} = useTranslation()

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

    // const alertTrigger = () => {
    // if (alert) {
    // return (
    // <Alert severity="success" variant="outlined" color="secondary">
    //     <AlertTitle>Upload successfully</AlertTitle>
    // </Alert>) 
    // } else {
    // <Alert severity="error" variant="outlined">
    //     <AlertTitle>Something went wrong</AlertTitle>
    // </Alert>
    // };
    // }

    const fileData = () => {
    if (avatar)
    return (
    <Typography variant="h5">{avatar.name}</Typography>
    );
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
    <Typography variant="h4" sx={{alignSelf: "center" }}>{currentUser?.username} {t('myaccount.profile')}</Typography>
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
        border: "2px solid #0f6B63",
    }}>
        {avatar ? fileData() : <Typography variant="h5">{t('myaccount.changeavatar')}</Typography>}
        <Button 
            component="span"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2, mb: 2, width: "75%" }}>
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