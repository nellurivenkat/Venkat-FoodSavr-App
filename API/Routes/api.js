const routes = require("express").Router();
const {
  register,
  sendVerificationEmail,
  verifyVerificationCode,
  login,
  updatePassword,
} = require("../Controller/authController");
const {
  getUserProfile,
  editUserProfile,
  getAllUsers,
} = require("../Controller/UserController");

const chatController = require("../Controller/chatController");

const {
  createPost,
updatePost,
  allPost,
  getPost,
deletePost
} = require("../Controller/postController");
const authMiddleware = require("../Middlewares/authMiddleware");

const { follow, unFollow } = require("../Controller/followController");

routes.post("/sendVerificationEmail", sendVerificationEmail);
routes.post("/verifyVerificationCode", verifyVerificationCode);
routes.post("/register", register);
routes.post("/login", login);
routes.post("/updatePassword", updatePassword);

// Get user profile
routes.get("/profile/:id", authMiddleware, getUserProfile);
// Edit user profile
routes.put("/profile", authMiddleware, editUserProfile);
// Get all users
routes.get("/users", getAllUsers);

// Routes for create post
routes.post('/createPost',authMiddleware, createPost);
routes.get('/posts', allPost);
routes.get('/posts/:id',authMiddleware, getPost);
routes.put('/post/:id',authMiddleware, updatePost);

routes.delete('/post/:id', deletePost);

// Route to send a message
routes.post("/sendMessage", authMiddleware, chatController.sendMessage);

// Route to get messages between two users
routes.get(
  "/getMessages/:userId/:otherUserId",
  authMiddleware,
  chatController.getMessages
);

routes.delete("/createPost/:id", createPost);

// Route to follow a user
routes.post("/follow/:userId", authMiddleware, follow);

// Route to unfollow a user
routes.post("/unfollow/:userId", authMiddleware, unFollow);

module.exports = routes;
