const Company = require("../models/company");
const Interviewer = require("../models/interviewer");
const Job = require("../models/job");

exports.createCompany = async (req, res) => {
  try {
    const { userID } = req.body;
    delete req.body.userID;

    const company = await Company.create(req.body);
    const interview = await Interviewer.findByIdAndUpdate(
      userID,
      { $push: { company: company._id } },
      { new: true, useFindAndModify: false }
    );
    console.log(company);

    res.json({
      status: 200,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: error,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.json({
        status: 500,
        error: "company not found",
      });
    }

    const jobs = company.job;
    company.job = [];

    for (let i = 0; i < jobs.length; i++) {
      const job = await Job.findById(jobs[i]);
      company.job.push(job);
    }

    const payload = {
      status: 200,
      data: company,
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
