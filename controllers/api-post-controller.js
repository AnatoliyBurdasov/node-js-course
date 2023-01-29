const Post = require("../models/post");

const handlError = (res, error) => {
  res.status(500).send(error.message);
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handlError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, { title, author, text }, { new: true })
    // как только находится в базе данных нужный мне файл по id. Он меняет старые значения на новые.
    //findByIdAndUpdate по умолчанию возвращает старое значение и что бы он возвращал новое изменённое значение
    //нужно добавить дополнительно 3-им аргументом я передаю объект конфигурации со значением true
    .then((post) => res.status(200).json(post))
    .catch((error) => {
      handlError(res, error);
    });
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => {
      handlError(res, error);
    });
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      handlError(res, error);
    });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => {
      handlError(res, error);
    });
};

module.exports = {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
};
