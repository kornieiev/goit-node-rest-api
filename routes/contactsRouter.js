const express = require("express");

const {
  getAllContacts,
  getContactById,
  deleteContactById,
  createContact,
  updateContactById,
  updateStatusContact,
} = require("../controllers/contacts");

const {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} = require("../schemas/contactsSchemas");

const validateBody = require("../helpers/validateBody");
const isValidId = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.delete("/:id", deleteContactById);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(favoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
