const express = require("express");
const router = express.Router();
const {
  addPost,
  getPost,
  editPost,
  getPosts,
  deletePost,
} = require("../controllers/api-post-controller");

// Get All Posts
router.get("/api/posts", getPosts);

// Add New Post
router.post("/api/post", addPost);

// Get Post by ID
router.get("/api/post/:id", getPost);

// Delete Post by ID
router.delete("/api/post/:id", deletePost);

// Update Post by ID
router.put("/api/post/:id", editPost);

module.exports = router;
