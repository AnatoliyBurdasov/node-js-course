const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    text: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

/*
Этот код использует модуль mongoose для работы с базой данных MongoDB.
Он объявляет константу "mongoose" которая подключает модуль mongoose,
и константу "Schema" которая создает новый экземпляр класса Schema.
Далее создается новая константа "postSchema" с помощью функции new Schema.
В конструктор этой функции передается объект, который описывает структуру документа в коллекции MongoDB.
В данном случае это text, title, author которые являются строками и обязательны для заполнения.
Вторым аргументом передается { timestamps: true } что добавляет в документ дату создания и дату обновления.
На основе этой схемы создается модель "Post", которая используется для работы с коллекцией постов в базе данных. */
