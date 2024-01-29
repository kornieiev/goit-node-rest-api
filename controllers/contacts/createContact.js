const Contact = require("../../models");

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(200).json(result);
};

module.exports = createContact;
