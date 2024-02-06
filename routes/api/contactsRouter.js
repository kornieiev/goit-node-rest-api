const express = require("express");

const { isValidId, tokenValidator } = require("../../middlewares");

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

contactsRouter.get("/", tokenValidator, getAllContacts);

contactsRouter.get("/:id", tokenValidator, isValidId, getContactById);

contactsRouter.delete("/:id", tokenValidator, isValidId, deleteContactById);

contactsRouter.post(
  "/",
  tokenValidator,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  tokenValidator,
  isValidId,
  validateBody(updateContactSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  tokenValidator,
  isValidId,
  validateBody(favoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
