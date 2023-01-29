const express = require("express");
const router = express.Router();
const {
  addPost,
  getPost,
  editPost,
  getPosts,
  deletePost,
  getAddPost,
  getEditPost,
} = require("../controllers/post-controller");

router.get("/posts/:id", getPost);

router.put("/edit/:id", editPost);

router.get("/edit/:id", getEditPost);

router.delete("/posts/:id", deletePost);

router.get("/posts", getPosts);

router.post("/add-post", addPost);

router.get("/add-post", getAddPost);

module.exports = router;
