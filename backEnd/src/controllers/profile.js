const Profile = require("../models/profile");

// Create Profile
exports.createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);

    console.log(profile);

    res.json({
      status: 200,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

// Get profile
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.json({
        status: 500,
        error: "profile not found",
      });
    }

    const payload = {
      status: 200,
      data: profile,
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
