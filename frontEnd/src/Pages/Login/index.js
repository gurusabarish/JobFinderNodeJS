import * as React from "react";
import config from "../../config";

import SignInForm from "./Form";

import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import { User } from "tabler-icons-react";

const Login = () => {
  return (
    <Card
      sx={{
        borderRadius: config.borderRadius,
        minWidth: 450,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: config.secondaryColor,
      }}
    >
      <CardContent>
        <Typography variant="h5" align="center" sx={{ my: 2 }}>
          <User size={48} strokeWidth={2} color={"black"} />
        </Typography>
        <Divider>SignIn with email</Divider>
        <Box sx={{ my: 2, px: 2 }}>
          <SignInForm />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
