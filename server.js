const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const createPath = require("./helpers/create-path");
const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const contactRoutes = require("./routes/contact-routes");
const postApiRoutes = require("./routes/api-post-routes");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("Connected to DB: "))
  .catch((error) => console.log("<<<< Error >>>>", error));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`listening port ${process.env.PORT}`);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));
app.use(methodOverride("_method"));

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/about-us", (req, res) => {
  const title = "Contacts";
  res.redirect("/contacts");
});

app.use((req, res) => {
  const title = "Error";
  res.status(404).render(createPath("error"), { title });
});

/*
    Что происходит в данном коде?

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

В этом коде происходит создание и сохранение нового поста в базу данных.
Информация о посте (title, author, text) берется из тела запроса (req.body).
Создается новый объект поста (post) с помощью конструктора Post
и далее сохраняется в базу данных с помощью метода save().
В случае успешного сохранения возвращается ответ со статусом 200
и информацией о посте в формате json. В случае ошибки сохранения,
вызывается функция handleError с передачей ответа (res) и информации об ошибке (error).
 */
