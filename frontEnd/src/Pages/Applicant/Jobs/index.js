import React, { useEffect, useState } from "react";
import JobsList from "./list";

const JobsForApplicant = (props) => {
  return (
    <>
      <JobsList userProfile={props.userProfile} />
    </>
  );
};

export default JobsForApplicant;
