import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from '@mui/material';

export default function CircularIndeterminate() {
  return (
    <Box sx={{backgroundColor: "rgb(52, 118, 173, 0.2)", borderRadius: "50%", width: "120px", height: "120px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={80} color="secondary" thickness={4.5}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <img src="/02_inclusum_icon_V3.png" alt="logo" style={{width: "30px"}}/>
      </Box>
    </Box>
    </Box>
  );
}
