// Контроллеры для работы с разными видами запросов и работы с БД

const Contact = require("../models");

const { request } = require("express");
const HttpError = require("../helpers/HttpError");
const { controllerWrapper } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;

  // const result = await Contact.findOne({ _id: id }); // вернет первое совпадение, или null, если не найдет
  const result = await Contact.findById(id); // или такой вариант поиска по id

  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(200).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "Favorite field not detected" });
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { $set: { favorite } },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
