const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // applied jobs
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    //Profile
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", applicantSchema);
