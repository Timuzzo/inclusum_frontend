import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useEffect } from "react";
import {
    Card, 
    CardHeader, 
    CardMedia, 
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Container,
    ThemeProvider,
    CssBaseline,
    Badge
} from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useTranslation } from "react-i18next";

export default function UserPost(){
const { theme } = useContext(ThemeContext);
const {loading, posts, getUserPosts, token } = useContext(DataContext);

const {t} = useTranslation();

useEffect(() => {}, [posts])

useEffect(() => {
    if (token) {
    getUserPosts();
    }
}, [token]);

return( 
<>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="xs" sx={{mb: "150px"}}>
      {loading ? ( // Show loading message if loading is true
        <Typography>{t('dashboard.loading')}...</Typography>
        ) : (
        <>
        {posts.length ? (
            posts.map((post) => (
            <Card sx={{mt: 2, border: "2px solid #0f6B63"}} key={post._id}>
            <CardHeader
                avatar={<Avatar aria-label="avatar">
                <AccountCircleIcon/>
                </Avatar>
            }
            action={
                <CheckCircleOutlineRoundedIcon  aria-label="verified" color="success"/>
            }
            title={post.title}
            subheader="June 20, 2023"
            />
            <CardMedia
            component="img"
            height="150"
            image="https://placehold.co/150x150"
            alt="image"
            />
            <CardContent>
                <Typography variant="body2">
                    {post.text} 
                </Typography>
            </CardContent>
            <CardActions>
                <Badge badgeContent={4} color="secondary">
                    <IconButton aria-label="like">
                        <ThumbUpAltRoundedIcon/>
                    </IconButton>
                </Badge>
                <Badge badgeContent={10} color="secondary" >
                    <IconButton aria-label="dislike">
                        <ThumbDownAltRoundedIcon />
                    </IconButton>
                </Badge>
            </CardActions>
        </Card>
            ))
        ) : (
            <Typography style={{ color: "red" }}>{t('dashboard.no_posts_found')}</Typography>
        )}
        </>
        )}
        </Container>
    </ThemeProvider>
</>
)}




