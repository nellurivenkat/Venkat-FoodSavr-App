const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel"); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Attach the user object to the request for further use in routes
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
