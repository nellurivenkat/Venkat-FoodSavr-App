// postController.js
const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
  try {
    const { media, price, title, details, location, type } = req.body;

    console.log(req.body);

    const newPost = new Post({
      media,
      price,
      title,
      details,
      type,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      user: req.user._id,
    });
    await newPost.save();

    console.log(newPost);
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    // Find the post by ID and populate the 'user' field
    const post = await Post.findById(postId).populate("user", "-password");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const user = post.user;
    // The 'user' field in the post will now contain the user details
    res.status(200).json({ post, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { media, price, title, details, location, image } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { media, price, title, details, location, image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createPost,
  allPost,
  getPost,
  updatePost,
  deletePost,
};
