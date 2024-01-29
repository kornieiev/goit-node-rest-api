const Contact = require("../../models");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

module.exports = getAllContacts;
