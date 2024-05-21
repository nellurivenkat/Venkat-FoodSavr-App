const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

// Controller function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("UserID", userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await Post.find({ user: user._id });

    res.status(200).json({ user, post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to edit user profile
const editUserProfile = async (req, res) => {
  try {
    const userId = req.body._id;

    const {
      firstName,
      lastName,
      email,
      image,
      phoneNumber,
      accountType,
      bio,
      location,
      _id
    } = req.body;

    console.log("Request Body:", req.body);

    // Validate request body
    if (
      !firstName ||
      !lastName ||
      !email ||
      !image ||
      !phoneNumber
    ) {
      return res
        .status(450)
        .json({ message: "All required fields must be provided" });
    }

    console.log("Updating user profile for user ID:", userId);
    console.log("New Profile Data:", {
      firstName,
      lastName,
      email,
      image,
      phoneNumber,
      accountType,
      bio,
      location,
    });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        email,
        image,
        phoneNumber,
        accountType,
        bio,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      { new: true }
    );

    console.log("Updated User Profile:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserProfile,
  editUserProfile,
  getAllUsers,
};
