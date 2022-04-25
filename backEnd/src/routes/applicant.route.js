const express = require("express");
const applicant = express();

const { getApplicantById } = require("../controllers/applicant");

applicant.get("/api/applicant/:id", getApplicantById);

module.exports = applicant;
