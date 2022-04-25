const User = require("../models/user");
const Interviewer = require("../models/interviewer");
const Applicant = require("../models/applicant");

const { sendEmail } = require("../helpers/email");

exports.signup = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    // Check the user already exists
    if (userExists) {
      return res.json({
        status: 500,
        error: "Email is taken!",
      });
    }

    let user;
    if (req.body.role === "interviewer") {
      const newUser = new User(req.body);
      user = await newUser.save();

      const interviewerUser = await Interviewer.create({
        _id: user._id,
        company: [],
      });
      console.log(interviewerUser);
    } else if (req.body.role === "applicant") {
      const newUser = new User(req.body);
      user = await newUser.save();

      const applicantUser = await Applicant.create({
        _id: user._id,
        appliedJobs: [],
        profile: user._id,
      });
      console.log(applicantUser);
    }
    delete user.password;

    // SignUp email data
    const welcomeEmailData = {
      from: "noreply@jobfinder.com",
      to: user.email,
      subject: `Welcome to Job Finder! ${user.name}`,
      text: `Welcome to Job Finder! ${user.name}`,
      html: `<p>Click here to go the feed</p> <p>https://localhost:3000</p>`,
    };
    sendEmail(welcomeEmailData);

    res.json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: error,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        status: 500,
        error: "User with that email does not exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: 500,
        error: "Incorrect email or password",
      });
    }

    const payload = {
      status: 200,
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
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

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.json({
        status: 500,
        error: "User does not exist.",
      });
    }

    delete user.password;

    const payload = {
      status: 200,
      data: user,
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
