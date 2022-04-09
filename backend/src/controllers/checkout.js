const validate = require("../utils/validations");
const validations = require("../utils/validations/checkout");
const checkoutService = require("../services/mogno/checkout");

async function checkout(req, res) {
  const cleanFields = await validate(validations.checkoutSchema, req.body);
  const temp = await checkoutService.checkout(
    req.user.id,
    cleanFields.items,
    cleanFields.isGift ?? false,
    cleanFields.description ?? ""
  );

  res.send(temp);
}

module.exports = { checkout };
