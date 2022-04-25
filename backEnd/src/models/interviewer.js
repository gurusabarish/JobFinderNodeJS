const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const interviewerSchema = new mongoose.Schema(
  {
    _id: {
      type: ObjectId,
      ref: "User",
    },
    company: [
      {
        type: ObjectId,
        ref: "Company",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interviewer", interviewerSchema);
