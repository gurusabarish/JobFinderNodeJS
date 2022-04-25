const express = require("express");
const profile = express();

const { createProfile, getProfileById } = require("../controllers/profile");

profile.post("/api/profile", createProfile);
profile.get("/api/profile/:id", getProfileById);

module.exports = profile;
