const Post = require("../models/post");
const createPath = require("../helpers/create-path");

const handlError = (res, error) => {
  console.log(err);
  res.render(createPath("error"), { error, title: "Error" });
};

const getPost = (req, res) => {
  const title = "Post";

  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { title, post }))
    .catch((error) => handlError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { title, author, text })
    // как только находится в базе данных нужный мне файл по id. Он меняет старые значения на новые.
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      handlError(res, error);
    });
};

const getEditPost = (req, res) => {
  const title = "Edit Post";

  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { title, post }))
    .catch((error) => {
      handlError(res, error);
    });
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((error) => {
      handlError(res, error);
    });
};

const getPosts = (req, res) => {
  const title = "Posts";

  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.render(createPath("posts"), { posts, title });
    })
    .catch((error) => {
      handlError(res, error);
    });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then(() => res.redirect("/posts"))
    .catch((error) => {
      handlError(res, error);
    });
};

const getAddPost = (req, res) => {
  const title = "Add post";
  res.render(createPath("add-post"), { title });
};

module.exports = {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
  getAddPost,
  getEditPost,
};
