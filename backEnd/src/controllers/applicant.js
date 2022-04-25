const Job = require("../models/job");
const Applicant = require("../models/applicant");

exports.getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);

    if (!applicant) {
      return res.json({
        status: 500,
        error: "applicant not found",
      });
    }

    const jobs = applicant.appliedJobs;
    applicant.appliedJobs = [];

    for (let i = jobs.length - 1; i >= 0; i--) {
      const job = await Job.findById(jobs[i]);
      applicant.appliedJobs.push(job);
    }
    

    const payload = {
      status: 200,
      data: applicant,
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
