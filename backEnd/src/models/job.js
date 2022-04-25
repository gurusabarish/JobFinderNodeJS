// const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema({
//   title: String,
//   description: String,
// });

// const Job = mongoose.model("Job", JobSchema);

// module.exports = Job;

const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    company: {
      type: ObjectId,
      ref: "Company",
      required: true,
    },
    applicants: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
