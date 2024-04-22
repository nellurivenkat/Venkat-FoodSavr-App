const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  media: [{ type: String, required: true }], // Array of image URLs
  price: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
    location: {
      type: {
        latitude: { type: String },
        longitude: { type: String },
      },
    },

  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Assuming 'User' is the name of the referenced model
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
