const Job = require("../models/job");
const Company = require("../models/company");
const User = require("../models/user");
const Applicant = require("../models/applicant");
const Profile = require("../models/profile");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { company } = req.body;

    const job = await Job.create(req.body);
    const companyDetails = await Company.findByIdAndUpdate(
      company,
      { $push: { job: job._id } },
      { new: true, useFindAndModify: false }
    );
    console.log(companyDetails);

    res.json({
      status: 200,
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

// Get Job
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.json({
        status: 500,
        error: "job not found",
      });
    }

    job.company = await Company.findById(job.company);

    const applicants = job.applicants;
    job.applicants = [];

    for (let i = 0; i < applicants.length; i++) {
      const applicant = await User.findById(applicants[i]);
      job.applicants.push(applicant);
    }

    const payload = {
      status: 200,
      data: job,
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

// Apply job
exports.applyJob = async (req, res) => {
  try {
    const { job, applicant } = req.body;

    const jobDetails = await Job.findByIdAndUpdate(
      job,
      { $push: { applicants: applicant } },
      { new: true, useFindAndModify: false }
    );
    console.log(jobDetails);

    const applicantDetails = await Applicant.findByIdAndUpdate(
      applicant,
      { $push: { appliedJobs: job } },
      { new: true, useFindAndModify: false }
    );
    console.log(applicantDetails);


    res.json({
      status: 200,
      data: "Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

// Get jobs by city
exports.getJobsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const jobs = await Job.find({ city: city });

    if (!jobs) {
      return res.json({
        status: 500,
        error: "jobs not found",
      });
    }

    for (let i = 0; i < jobs.length; i++) {
      jobs[i].company = await Company.findById(jobs[i].company);
    }

    const payload = {
      status: 200,
      data: jobs,
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


// Get job applicants by job id
exports.getJobApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).lean();

    if (!job) {
      return res.json({
        status: 500,
        error: "job not found",
      });
    }

    const applicants = job.applicants;
    job.applicants = [];

    for(let idx = applicants.length-1; idx >= 0; idx--) {
      const applicant = await Profile.findById(applicants[idx]);
      console.log(applicant);
      job.applicants.push(applicant);
    }

    console.log(job);

    const payload = {
      status: 200,
      data: job,
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
}