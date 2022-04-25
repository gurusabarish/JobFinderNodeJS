const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    // Name
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },

    //Resume
    // resume: { data: Buffer, contentType: String },

    // Recommendation by skill
    skills: [
      {
        type: String,
        maxlength: 32,
      },
    ],

    // Contact information
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      max: 9999999999,
    },

    // Address
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    doorNo: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
