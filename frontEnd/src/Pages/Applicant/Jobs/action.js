import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

import config from "../../../config";

export default function Action(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleUpdate = (data) => {
  //   updateData(data);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [applied, setApplied] = React.useState(false);
  const handleApplyJob = async (job, applicant) => {
    console.log(job, applicant);
    const payload = {
      job: job,
      applicant: applicant,
    }

    const response = await axios.post(`${config.apiURL}/api/job/apply`, payload);
    console.log(response);
  };

  return (
    <div>
      <Button
        disableElevation
        onClick={async () => {
          await handleApplyJob(props.data._id, localStorage.getItem("token"));
          setApplied(true);
        }}
        size="medium"
        variant="contained"
        disabled={applied}
      >
        Apply
      </Button>
     </div>
  );
}
