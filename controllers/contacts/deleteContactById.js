const Contact = require("../../models");
const HttpError = require("../../helpers");

const deleteContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = deleteContactById;
