import React, { useState } from "react";

import { Grid, Button } from "@mui/material";

// Config
import config from "../../config";

// MainCard
import MainCard from "../../Components/MainCard";

import UserDetails from "./userDetails";
import EditProfile from "./editProfile";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = async (val) => {
    setEditProfile(val);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <MainCard
          title="Profile"
          secondary={
            <Button
              disableElevation
              onClick={() => {
                setEditProfile(true);
              }}
              size="medium"
              variant="contained"
              style={{ borderRadius: config.borderRadius }}
            >
              Edit
            </Button>
          }
        >
          {editProfile ? (
            <EditProfile handleEditProfile={handleEditProfile} />
          ) : (
            <UserDetails handleEditProfile={handleEditProfile} />
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
