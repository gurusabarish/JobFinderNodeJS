import React from "react";

import config from "../config";

// material-ui
import { Card } from "@mui/material";

//-----------------------|| CUSTOM SUB CARD ||-----------------------//

const SubCard = (props) => {
  return (
    <Card
      sx={{
        borderRadius: config.borderRadius,
        ":hover": {
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
        },
        p: 2,
        boxShadow: "none",
      }}
    >
      {props.children}
    </Card>
  );
};

export default SubCard;
