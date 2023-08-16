const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt - updateAt", {
    skip,
    limit,
  }).populate("owner");
  res.json(result);
};

const getByIdContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body }, owner);
  res.json(result);
};

const updateContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContacts: ctrlWrapper(getByIdContacts),
  addContacts: ctrlWrapper(addContacts),
  updateContacts: ctrlWrapper(updateContacts),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContacts: ctrlWrapper(deleteContacts),
};
