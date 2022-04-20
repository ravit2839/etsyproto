const bcrypt = require("bcrypt");
var Users = require("../schema/user");

async function handle_request(msg, callback) {
  console.log("In register post");
  console.log(msg.username + " --------------- ");
  if (!msg) {
    callback(null, { message: "None" });
    return;
  }

  const hashedPassword = await bcrypt.hash(msg.password, 10);
  const user = new Users({
    username: msg.username,
    email: msg.email,
    password: hashedPassword,
  });

  user
    .save(user)
    .then((data) => {
      callback(null, { status: 200, data });
    })
    .catch((err) => {
      console.log(err);
      callback(null, { status: 200, response: {} });
    });
}

exports.handle_request = handle_request;
