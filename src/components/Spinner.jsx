import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from '@mui/material';

export default function CircularIndeterminate() {
  return (
    <Box sx={{backgroundColor: "rgb(52, 118, 173, 0.2)", borderRadius: "50%", width: "120px", height: "120px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {/* <CircularProgress size={80} color="secondary" thickness={4.5}/> */}
      <img src="/icon_inclusum.gif" alt="spinner" style={{width: "100px"}}/>
    </Box>
  );
}
