import * as React from "react";
import config from "../../config";

import SignUpForm from "./Form";

import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import { UserCircle } from "tabler-icons-react";

const SignUp = () => {
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
          <UserCircle size={48} strokeWidth={2} color={"black"} />
        </Typography>
        <Divider>SignUp</Divider>
        <Box sx={{ my: 2, px: 2 }}>
          <SignUpForm />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignUp;
