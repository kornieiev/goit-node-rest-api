const { Contact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  // PAGINATION:
  const { limit, page } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find().skip(skip).limit(limit);
  res.status(200).json(result);
};

module.exports = getAllContacts;
