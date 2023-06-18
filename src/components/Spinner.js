import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
