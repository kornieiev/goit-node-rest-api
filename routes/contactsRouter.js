const express = require("express");

const contactsControllers = require("../controllers/contactsControllers");

const {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} = require("../schemas/contactsSchemas");

const validateBody = require("../helpers/validateBody");
const isValidId = require("../middlewares");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getContactById);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(favoriteSchema),
  contactsControllers.updateStatusContact
);

module.exports = contactsRouter;
