const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getByIdContacts);

router.post("/", validateBody(schemas.contactAddSchema), ctrl.addContacts);

router.put(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  ctrl.updateContacts
);

router.delete("/:contactId", ctrl.deleteContacts);

module.exports = router;
