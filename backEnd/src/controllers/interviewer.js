const Interviewer = require("../models/interviewer");
const Company = require("../models/company");

exports.getInterviewerById = async (req, res) => {
  try {
    const { id } = req.params;
    const interviewer = await Interviewer.findById(id);

    if (!interviewer) {
      return res.json({
        status: 500,
        error: "interviewer not found",
      });
    }

    const companies = interviewer.company;
    interviewer.company = [];

    for (let i = 0; i < companies.length; i++) {
      const company = await Company.findById(companies[i]);
      interviewer.company.push(company);
    }

    const payload = {
      status: 200,
      data: interviewer,
    };
    console.log(payload);

    return res.json(payload);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};
