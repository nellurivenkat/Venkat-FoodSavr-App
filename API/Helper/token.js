const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};

module.exports = {
  generateToken,
};
