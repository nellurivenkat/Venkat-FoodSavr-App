const User = require("../Models/UserModel"); // Import the User model

const follow = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the request parameters
  const { followerId } = req.user._Id; // Assuming followerId is passed in the request body

  try {
    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the follower is already following the user
    if (user.followers.includes(followerId)) {
      return res
        .status(400)
        .json({ message: "User is already being followed" });
    }

    user.followers.push(followerId);
    follower.following.push(userId);

    await user.save();
    await follower.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const unFollow = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed in the request parameters
  const { followerId } = req.user._Id; // Assuming followerId is passed in the request body

  try {
    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the follower is not following the user
    if (!user.followers.includes(followerId)) {
      return res.status(400).json({ message: "User is not being followed" });
    }

    user.followers = user.followers.filter(
      (id) => id.toString() !== followerId
    );
    follower.following = follower.following.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await follower.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  follow,
  unFollow,
};
