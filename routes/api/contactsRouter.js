const express = require("express");

const { isValidId, validToken } = require("../../middlewares");

const {
  getAllContacts,
  getContactById,
  deleteContactById,
  createContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} = require("../../schemas/contactsSchemas");

const { validateBody } = require("../../helpers");

const contactsRouter = express.Router();

contactsRouter.get("/", validToken, getAllContacts);

contactsRouter.get("/:id", validToken, isValidId, getContactById);

contactsRouter.delete("/:id", validToken, isValidId, deleteContactById);

contactsRouter.post(
  "/",
  validToken,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  validToken,
  isValidId,
  validateBody(updateContactSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  validToken,
  isValidId,
  validateBody(favoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
