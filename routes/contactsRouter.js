const express = require("express");

const contactsControllers = require("../controllers/contactsControllers");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

const validateBody = require("../helpers/validateBody");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getContactById);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

module.exports = contactsRouter;
