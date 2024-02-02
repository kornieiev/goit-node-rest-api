const express = require("express");

const { isValidId, isValidToken } = require("../../middlewares");

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

contactsRouter.get("/", isValidToken, getAllContacts);

contactsRouter.get("/:id", isValidToken, isValidId, getContactById);

contactsRouter.delete("/:id", isValidToken, isValidId, deleteContactById);

contactsRouter.post(
  "/",
  isValidToken,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValidToken,
  isValidId,
  validateBody(updateContactSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidToken,
  isValidId,
  validateBody(favoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
