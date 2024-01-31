// mongoose модель это класс, который связан с определенной коллекцией.
// При вызове метода класса идет запрос к коллекции
// Модель - это существительное в единичной форме. Например, если мы работаем с contacts, то модель будет называться 'contact'

// Про валидацию в схеме:
// https://mongoosejs.com/docs/validation.html
// https://youtu.be/ptECPvMUfkk?t=1729

const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema( // схема, куда первым аргументом передается описание объекта, которое будет передаваться в базу данных
  {
    name: {
      // название поля
      type: String, // тип данных
      required: [true, "Set name for contact"], // required - обязательно поле для отправки в БД
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true } // вместо создания строки на бекенде с указанием версии будет создан штамп времени создания и изменения
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema); // создание модели: Имя модели - существительное в единичной форме.
// В model передаем(имя коллекции в единичной форме, mongoose добавит множественное число сам)
// вторым аргументом передается схема, в соответствии к которой будет создаваться модель
// "contact" - название коллекции. contactSchema - название Mongoose схемы

module.exports = Contact; // экспортируем класс для работы в controllers.
