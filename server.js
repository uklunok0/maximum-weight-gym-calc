const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Добавлено для работы с путями к файлам

const app = express();
const port = 3000;

// Подключение статической папки
app.use(express.static(path.join(__dirname, "public")));

// Обработчик для главной страницы
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/index.html"));
});

// используем middleware body-parser для обработки POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}. Listening...`);
});
