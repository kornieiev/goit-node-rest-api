const { request } = require("express");
const contactsService = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");
const { controllerWrapper } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts(req.body);
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(200).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
