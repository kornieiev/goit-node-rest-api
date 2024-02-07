const express = require("express");

const { isValidId, authenticate } = require("../../middlewares");

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

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getContactById);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContactById);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(favoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
