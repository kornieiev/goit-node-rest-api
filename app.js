const express = require("express"); // создает веб-сервер
const morgan = require("morgan"); // для логирования HTTP-запросов
const cors = require("cors"); // позволяет браузеру разрешать кросс-доменные запросы
const mongoose = require("mongoose"); // создает подключение к базе данных MongoDB
require("dotenv").config(); // ищет в проекте файл .env и читает из него указанные в нем КЛЮЧ=значение

const {
  DB_ADMIN_NAME,
  DB_ADMIN_PASSWORD,
  DB_CLUSTER_NAME,
  DB_COLLECTION,
  PORT,
} = process.env; // импорт значений из .env

const DB_HOST_NEW = `mongodb+srv://${DB_ADMIN_NAME}:${DB_ADMIN_PASSWORD}@${DB_CLUSTER_NAME}.mongodb.net/${DB_COLLECTION}`; // адрес для подключения к БД

const contactsRouter = require("./routes/contactsRouter"); // пути для отправления запросов и методы их обработки для работы с БД

const app = express(); // создание веб-сервера

app.use(morgan("dev")); // 'combined', 'common', 'short', 'tiny', 'dev'
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose //
  .connect(DB_HOST_NEW)
  .then(() => console.log("Database connection successful"))
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running. Use this API on port: ${PORT}`)
    )
  )
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
