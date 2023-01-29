const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = 3000;
const HOST = "localhost";

/* Серверный роутинг */

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");

  const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);
  /*
На выходе функции createPath я получаю простую строку
Дело в том что некоторые файловые системы использую прямую либо косую строку, 
а некоторые обратную и модуль path прекрасно справляется с этими различиями
в результате я получаю кроссплатформенную работу сервера.
*/
  let basePath = "";

  switch (req.url) {
    case "/":
      basePath = createPath("index");
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "contact");
      res.end();
      break;
    case "/contact":
      basePath = createPath("contact");
      res.statusCode = 200;
      break;
    default:
      basePath = createPath("error");
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log("Error>>>", err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, HOST, (err) =>
  err ? console.log(err) : console.log("Server started!")
);

/* Модуль path нужен для коректного формирования пути */
/* Если я работаю с запросами и ответами то я всегда
   в конце должен прописывать res.end(). Для того 
   что бы вернуть контроль браузеру. */

/* Можно сделать редирект на другую страницу, если вдруг поменялся url
   строчки от 26 до 30
   */
