import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";

const InterviewerMenu = () => {
  return (
    <>
      <Link style={{ color: "white", textDecoration: "none" }} to="/search">
        <Typography variant="body2" noWrap component="div" sx={{ m: 2 }}>
          Search
        </Typography>
      </Link>
    </>
  );
};

export default InterviewerMenu;
