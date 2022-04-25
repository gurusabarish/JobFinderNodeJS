import React, { useState } from "react";
// import { Link } from "react-router-dom";

import { Grid, Button } from "@mui/material";

// Config
import config from "../../config";

// MainCard
import MainCard from "../../Components/MainCard";

// Companies
import CompaniesList from "./company/list";
import CreateCompany from "./company/create";

// Jobs
import JobsList from "./job/list";
import CreateJob from "./job/create";

const Interviewer = () => {
  const [createCompany, setCreateCompany] = useState(false);
  const [createJob, setCreateJob] = useState(false);

  const handleCreateCompany = async (val) => {
    setCreateCompany(val);
  };

  const handleCreateJob = async (val) => {
    setCreateJob(val);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <MainCard
          title="Jobs"
          secondary={
            <Button
              disableElevation
              onClick={() => {
                setCreateJob(true);
              }}
              size="medium"
              variant="contained"
              style={{ borderRadius: config.borderRadius }}
            >
              Create
            </Button>
          }
        >
          {createJob ? (
            <CreateJob handleCreateJob={handleCreateJob} />
          ) : (
            <JobsList isCreateJob={createJob} />
          )}
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <MainCard
          title="Companies"
          secondary={
            <Button
              disableElevation
              onClick={() => {
                setCreateCompany(true);
              }}
              size="medium"
              variant="contained"
              style={{ borderRadius: config.borderRadius }}
            >
              Create
            </Button>
          }
        >
          {createCompany ? (
            <CreateCompany handleCreateCompany={handleCreateCompany} />
          ) : (
            <CompaniesList isCreateCompany={createCompany} />
          )}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Interviewer;
