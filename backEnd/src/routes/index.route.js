const express = require("express");
const auth = require("./auth.route");
const company = require("./company.route");
const interviewer = require("./interviewer.route");
const job = require("./job.route");
const profile = require("./profile.route");
const applicant = require("./applicant.route");

const route = express();

route.use(auth);
route.use(applicant);
route.use(company);
route.use(interviewer);
route.use(job);
route.use(profile);

route.get("/", (req, res) => {
  const test = {
    message: "OK testing",
    timestamp: Date.now(),
  };
  res.send(JSON.stringify(test));
});

module.exports = route;
