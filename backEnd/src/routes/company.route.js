const express = require("express");
const company = express();

const { createCompany, getCompanyById } = require("../controllers/company");

company.post("/api/company", createCompany);

company.get("/api/company/:id", getCompanyById);

module.exports = company;
