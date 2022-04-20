var favouritesDb = require("../schema/favourites");
async function handle_request(msg, callback) {
  const userId = msg.userId;
  console.log(userId);
  const itemId = msg.itemId;

  const favourites = new favouritesDb({
    userId,
    itemId,
  });

  favourites
    .save(favourites)
    .then((data) => {
      console.log(data);
      callback(null, { success: true, result: data });
    })
    .catch((err) => {
      console.log(err);
      callback(null, { message: "some error occured" });
    });
}

exports.handle_request = handle_request;
