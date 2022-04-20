var purchasesDb = require("../schema/purchases");

async function handle_request(msg, callback) {
  console.log("handling add to purchases ");

  const purchase = msg.product;

  console.log(purchase.itemId);
  const purchases = new purchasesDb({
    userId: purchase.userId,
    itemName: purchase.itemName,
    itemPrice: purchase.itemPrice,
    itemCount: purchase.itemCount,
    qty: purchase.qty,
    itemId: purchase.itemId,
    itemImage: purchase.itemImage,
    itemDescription: purchase.itemDescription,
    Description: purchase.Description,
  });

  purchases
    .save(purchases)
    .then((data) => {
      console.log(data.itemId);
	    console.log(data.itemName);
	    console.log(data.itemPrice);
      callback(null, { success: true, result: {itemId: data.itemId, itemName: data.itemName, itemPrice: data.itemPrice} });
    })
    .catch((err) => {
      console.log(err);
      callback(null, { message: "some error occured" });
    });
}

exports.handle_request = handle_request;
