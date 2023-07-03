import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
  Backdrop,
  Zoom,
  CardMedia,
} from "@mui/material/";
import PlaceIcon from "@mui/icons-material/Place";
import CircularIndeterminate from "./Spinner";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DBPost() {
  const { theme } = useContext(ThemeContext);
  const { mergedDBDataArray, currentUser, loading } = useContext(DataContext);

  const { t } = useTranslation();
  const filteredDBPosts = mergedDBDataArray?.filter((post) =>
    post?.stationName?.includes(currentUser?.city)
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xs" sx={{ mb: 3 }}>
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
          <>
            {filteredDBPosts?.map((post) => (
              <Card
                sx={{ mt: 2, border: "2px solid #0f6B63" }}
                key={post?.equipmentnumber}
              >
                <CardHeader
                  avatar={
                    <Avatar src="https://marketingportal.extranet.deutschebahn.com/resource/blob/9692854/85e5d516abe712affc4c29b6dc7d0a3d/Bild_06-data.png" />
                  }
                  title="Deutsche Bahn"
                />
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    p: "0 16px 0 16px",
                  }}
                >
                  <PlaceIcon fontSize="small" />
                  <Typography fontSize="14px">{post?.stationName}</Typography>
                </CardContent>
                <MapContainer
                  center={[post.geocoordY, post.geocoordX]}
                  zoom={15}
                >
                  <CardMedia
                    height="300"
                    width="300"
                    sx={{
                      pt: 1,
                      objectFit: "center",
                      cursor: "pointer",
                      mb: "150px",
                    }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[post.geocoordY, post.geocoordX]}
                    ></Marker>
                  </CardMedia>
                </MapContainer>
                <CardContent>
                  <Typography variant="h6">{post.type}</Typography>
                  {post?.description ? (
                    <Typography variant="body2">{post.description}</Typography>
                  ) : (
                    <></>
                  )}
                  {post.stateExplanation !== "not available" ? (
                    <Typography variant="body2">
                      {post.stateExplanation}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      No detailed information
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
        </Container>
      </ThemeProvider>
    </>
  );
}
