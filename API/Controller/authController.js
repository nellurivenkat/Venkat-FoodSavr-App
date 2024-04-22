const User = require("../Models/UserModel");
const { generateCode } = require("../Helper");
const bcrypt = require("bcryptjs");
const Code = require("../Models/CodeModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../Helper/token");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, accountType } =
      req.body;
    if (!firstName)
      return res.status(400).json({ message: "Your first name is required" });
    if (!lastName)
      return res.status(400).json({ message: "Your last name is required" });
    if (!email)
      return res.status(400).json({ message: "Your email name is required" });
    if (!password)
      return res
        .status(400)
        .json({ message: "Your password name is required" });
    if (!phoneNumber)
      return res
        .status(400)
        .json({ message: "Your phone number name is required" });
    // Turn email to lower case
    const filteredEmail = email.toLowerCase();

    // Check if user already exists
    const user = await User.findOne({ email: filteredEmail });
    if (user) return res.status(401).json({ message: "User already exists" });

    const chackNumber = await User.findOne({ phoneNumber: phoneNumber });
    if (chackNumber)
      return res.status(401).json({ message: "Phone number already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create a new user with Dorset University location
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      accountType,
      email: filteredEmail,
      password: hashedPassword,
      image:
        "https://th.bing.com/th/id/R.396a8ea66c7d39c7737bef08a6193200?rik=JX6qZMoUg54nOw&pid=ImgRaw&r=0",
    });

    const token = await generateToken({ userId: newUser._id });
    const userData = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phoneNumber: newUser.phoneNumber,
      location: newUser.location,
      image: newUser.image,
      accountType: newUser.accountType,
    };
    res.status(200).json({ user: userData, token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res.status(400).json({ message: "Your email is required" });
    if (!password)
      return res.status(400).json({ message: "Your password is required" });

    const filteredEmail = email.toLowerCase();
    // Get the user if exists
    const user = await User.findOne({ email: filteredEmail });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = await generateToken({ userId: user._id });
    const userData = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      image: user.image,
      location: user.location,
      accountType: user.accountType,
    };

    res.status(200).json({ user: userData, token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Receive new email
const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Your email is required" });
    }
    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Email already belongs to another account" });
    }
    const code = generateCode();
    console.log(code);
    // Hash the code for storage
    const hashedCode = await bcrypt.hash(code, 10);
    // Check if there's an existing code for this email
    const codeExist = await Code.findOne({ email });
    if (codeExist) {
      await Code.updateOne({ email }, { encryptCode: hashedCode });
    } else {
      await Code.create({ email, encryptCode: hashedCode });
    }
    return res
      .status(200)
      .json({ message: "Verification code was successfully sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Recive the email and also the code sent tot the User
const verifyVerificationCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Your email is required" });
    }
    if (!code) {
      return res.status(400).json({ message: "Your code is required" });
    }

    // Get the user details
    const codeData = await Code.findOne({ email: email });
    if (!codeData) return res.status(404).json({ message: "User not Found" });

    // Compare the provided code with the hashed code in the database
    const isCodeValid = await bcrypt.compare(code, codeData.encryptCode);
    if (!isCodeValid) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    // Generate JWT token
    const token = generateToken({ email: codeData.email });
    // Send the token as a response
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;

    // Check if token and email are provided
    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Check if the decoded email matches the provided email
      if (decoded.email !== email) {
        return res.status(401).json({ message: "Token does not match email" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password in the database
      await User.findOneAndUpdate(
        { email: email },
        { password: hashedPassword }
      );

      // Respond with success message
      return res.status(200).json({ message: "Password updated successfully" });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {};

module.exports = {
  register,
  sendVerificationEmail,
  verifyVerificationCode,
  login,
  logout,
  updatePassword,
};
