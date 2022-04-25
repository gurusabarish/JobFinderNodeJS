import * as React from "react";
import config from "../config";

import { Grid } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: "100vh", backgroundColor: config.backgroundColor }}
    >
      <Grid item xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "calc(100vh - 68px)" }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item sx={{ mb: 3 }}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
