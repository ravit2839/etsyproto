var items = require("../schema/items");

async function handle_request(msg, callback) {
  console.log("Retrieve Products");
  const userId = msg.id;
  const key = msg.keyExtractor;
  console.log("Retrieve Products");
  if (key) {
    await items
      .find({ userId: userId, itemName: { $regex: key, $options: "i" } })
      .then((products) => {
        console.log(products);
        callback(null, { products });
      });
  }
}

exports.handle_request = handle_request;
