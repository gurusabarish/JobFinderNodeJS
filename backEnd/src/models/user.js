const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["applicant", "interviewer"],
      default: "applicant",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return plainText === this.password;
  },
};

module.exports = mongoose.model("User", userSchema);
