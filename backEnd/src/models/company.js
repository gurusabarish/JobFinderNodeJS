// const mongoose = require("mongoose");

// const companySchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   jobs: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Job",
//     },
//   ],
// });

// const Company = mongoose.model("Company", companySchema);

// module.exports = Company;

const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    job: [
      {
        type: ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
