const express = require("express");
// const auth = require("./auth.route");
const auth = express();

const { signup, signin, getUserById } = require("../controllers/auth");

auth.post("/api/auth/signin", signin);

auth.post("/api/auth/signup", signup);

auth.get("/api/auth/user/:id", getUserById);

module.exports = auth;
