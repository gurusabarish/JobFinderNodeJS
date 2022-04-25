import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { Grid, Button } from "@mui/material";

// Config
import config from "../../config";

// MainCard
import MainCard from "../../Components/MainCard";

// Jobs
import JobsForApplicant from "./Jobs";
import RecentlyAppliedList from "./RecentlyApplied/index";

// import CreateJob from "./job/create";

const Applicant = (props) => {
  const [createProfile, setCreateProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    const profile = await axios.get(
      `${config.apiURL}/api/profile/${localStorage.getItem("token")}`
    );
    console.log(profile);
    if (profile.data.status === 500) {
      setCreateProfile(true);
    }
    if (profile.data.status === 200) {
      setUserProfile(profile.data.data);
    }
  };

  return (
    <Grid container spacing={2}>
      {createProfile && <Navigate to="/profile" />}

      <Grid item xs={12} sm={6}>
        <MainCard
          title="Jobs recommended"
          // secondary={
          //   <Button
          //     disableElevation
          //     // onClick={() => {
          //     //   setCreateJob(true);
          //     // }}
          //     size="medium"
          //     variant="contained"
          //     style={{ borderRadius: config.borderRadius }}
          //   >
          //     Create
          //   </Button>
          // }
        >
          {userProfile && <JobsForApplicant userProfile={userProfile} />}
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <MainCard
          title="Applied Jobs"
          // secondary={
          //   <Button
          //     disableElevation
          //     // onClick={() => {
          //     //   setCreateCompany(true);
          //     // }}
          //     size="medium"
          //     variant="contained"
          //     style={{ borderRadius: config.borderRadius }}
          //   >
          //     Create
          //   </Button>
          // }
        >
          {userProfile && <RecentlyAppliedList />}
          
          {/* {createCompany ? (
            <CreateCompany handleCreateCompany={handleCreateCompany} />
          ) : (
            <CompaniesList isCreateCompany={createCompany} />
          )} */}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Applicant;
