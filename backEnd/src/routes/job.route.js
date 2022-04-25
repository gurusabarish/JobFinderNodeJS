const express = require("express");
const job = express();

const {
  createJob,
  getJobById,
  applyJob,
  getJobsByCity,
  getJobApplicants,
} = require("../controllers/job");

job.post("/api/job", createJob);
job.get("/api/job/:id", getJobById);
job.post("/api/job/apply", applyJob);
job.get("/api/job/applicant/:id", getJobApplicants);
job.get("/api/job/city/:city", getJobsByCity);

module.exports = job;
