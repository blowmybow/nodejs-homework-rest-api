const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getByIdContacts);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactAddSchema),
  ctrl.addContacts
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  ctrl.updateContacts
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContacts);

module.exports = router;
