import React from "react";
import { Box } from "@mui/material";

import Header from "../Components/Header";
import config from "../config";
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          px: 3,
          py: 4,
          minHeight: "100vh",
          backgroundColor: config.backgroundColor,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
