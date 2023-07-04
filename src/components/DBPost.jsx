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
  Dialog,
} from "@mui/material/";
import PlaceIcon from "@mui/icons-material/Place";
import CircularIndeterminate from "./Spinner";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

export default function DBPost() {
  const [open, setOpen] = useState(false);
  const [currentMapY, setCurrentMapY] = useState(null);
  const [currentMapX, setCurrentMapX] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { loading, filteredDBPosts } = useContext(DataContext);

  const handleMapOpen = (event) => {
    if (open) setOpen(false);
    setCurrentMapY(event.target.id);
    setCurrentMapX(event.target.title);
    if (!open) setOpen(true);
  };

  let DefaultIcon = L.icon({
    iconUrl: icon,
  });

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
                    p: "0 16px 16px 16px",
                  }}
                >
                  <PlaceIcon fontSize="small" />
                  <Typography fontSize="14px">{post?.stationName}</Typography>
                </CardContent>
                <MapContainer
                  center={[post?.geocoordY, post?.geocoordX]}
                  zoom={16}
                  dragging={false}
                  tap={false}
                  scrollWheelZoom={false}
                  style={{ height: "180px" }}
                >
                  <div
                    onClick={handleMapOpen}
                    id={post?.geocoordY}
                    title={post?.geocoordX}
                    style={{ height: "180px" }}
                    type="image"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[post.geocoordY, post.geocoordX]}
                      icon={DefaultIcon}
                    ></Marker>
                  </div>
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
                    <></>
                  )}
                </CardContent>
              </Card>
            ))}
          </>
          <Dialog open={open}>
            <MapContainer
              center={[currentMapY, currentMapX]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "500px", width: "300px" }}
            >
              <div onClick={handleMapOpen} style={{ height: "500px" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[currentMapY, currentMapX]}
                  icon={DefaultIcon}
                ></Marker>
              </div>
            </MapContainer>
          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}
