const express = require("express");
const interviewer = express();

const { getInterviewerById } = require("../controllers/interviewer");

interviewer.get("/api/interviewer/:id", getInterviewerById);

module.exports = interviewer;
