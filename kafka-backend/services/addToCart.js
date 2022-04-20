const jwt = require("jsonwebtoken");
var cartSch = require("../schema/cart");

async function handle_request(msg, callback) {
  console.log("handling cart");
  const userId = msg.userId;
  console.log(userId);
  const itemId = msg.itemId;
  console.log(itemId);
  const qty = msg.qty;

  const cart = new cartSch({
    userId: userId,
    itemId: itemId,
    qty: qty,
  });

  const isCartItemExist = await cartSch.exists({ itemId: itemId });

  if (isCartItemExist) {
    console.log("item already exists");

    cartSch
      .findOneAndUpdate({ itemId: itemId }, { qty: qty })
      .then((data) => {
        callback(null, { success: true, result: data });
        res.send({ success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        callback(null, { message: "some error occured" });
      });
  } else {
    console.log("item dont exist");
    cart
      .save(cart)
      .then((data) => {
        callback(null, { success: true, result: data });
      })
      .catch((err) => {
        console.log(err);
        callback(null, { message: "some error occured" });
      });
  }
}

exports.handle_request = handle_request;
