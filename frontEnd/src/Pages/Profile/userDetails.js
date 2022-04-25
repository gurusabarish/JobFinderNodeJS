import React, { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Button, Box } from "@mui/material";

// Config
import config from "../../config";

const UserDetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/profile/${localStorage.getItem("token")}`
      );
      console.log(response);

      if (response.data.status === 200) {
        setUser(response.data.data);
      } else if (response.data.status === 500) {
        setUser(null);
      }
    } catch (err) {
      console.log("error fetching data", err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
          Loading....
        </Typography>
      ) : (
        <>
          {user === null ? (
            <Typography align="center" variant="h6" sx={{ mt: 5, mb: 1 }}>
              Create your profile
              <Box sx={{ my: 2 }}>
                <Button
                  disableElevation
                  onClick={() => {
                    props.handleEditProfile(true);
                  }}
                  size="medium"
                  variant="contained"
                  style={{ borderRadius: config.borderRadius }}
                >
                  Create
                </Button>
              </Box>
            </Typography>
          ) : (
            <>
              <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
                First Name: {user.firstName}
              </Typography>

              <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
                Last Name: {user.lastName}
              </Typography>

              <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
                Email Address: {user.email}
              </Typography>

              <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
                Contact number: {user.phone}
              </Typography>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserDetails;
