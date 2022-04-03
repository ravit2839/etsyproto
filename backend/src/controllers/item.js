const validate = require("../utils/validations");
const validations = require("../utils/validations/item");
const itemService = require("../services/item");
const Exceptions = require("../utils/custom-exceptions");

async function listAllItems(req, res) {
  const items = await itemService.listAllItems();
  res.send({ items });
}
async function filteredItems(req, res) {
  const items = await itemService.filteredItems({ ...req.body });
  res.send({ items });
}
async function singleItem(req, res) {
  const item = await itemService.singleItem(+req.params.id);
  res.send({ item });
}
async function createItem(req, res) {
  const cleanFields = await validate(validations.createItemSchema, req.body);

  if (!req.files.featured) {
    throwValidationErrors(
      "Please upload featured image. This is required field"
    );
  }
  
  const featuredImage = req.files.featured[0].filename;
  const item = await itemService.createNewitem({
    ...cleanFields,
    featuredImage,
  });
  res.send({ item });
}

async function updateItem(req, res) {
  const cleanFields = await validate(validations.updateItemSchema, req.body);
  await itemService.updateItem(+req.params.id, cleanFields);
  res.send({ message: "Successfully updated item" });
}

module.exports = {
  listAllItems,
  filteredItems,
  singleItem,
  createItem,
  updateItem,
};

function throwValidationErrors(err) {
  throw new Exceptions.ValidationException("Please enter valid information", [
    err,
  ]);
}