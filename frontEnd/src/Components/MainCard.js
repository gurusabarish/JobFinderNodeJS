import * as React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import config from "./../config";

export default function MainCard(props) {
  return (
    <Box>
      <Card variant="outlined" sx={{ borderRadius: config.borderRadius }}>
        <CardHeader
          sx={{ p: 3 }}
          title={<Typography variant="h5">{props.title}</Typography>}
          action={props.secondary}
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>{props.children}</CardContent>
      </Card>
    </Box>
  );
}
