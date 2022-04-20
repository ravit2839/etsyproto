var connection = new require("./kafka/Connection");
var addUser = require("./services/addUser");
var addToCart = require("./services/addToCart");
var getFavs = require("./services/getFavs");
var getItems = require("./services/getProducts");
var addProuctsToPurchases = require("./services/addToPurchases");
const updateUser = require("./services/updateUser");
const addFavourites = require("./services/addFavourites");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const connectDB = require("./database/connection.js");
connectDB();

function handleTopicRequest(topic_name, fname) {
  console.log("Topic");
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Spinning server  ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
handleTopicRequest("getFavourites", getFavs);
handleTopicRequest("getProducts", getItems);
handleTopicRequest("addToCart", addToCart);
handleTopicRequest("addToPurchase", addProuctsToPurchases);
handleTopicRequest("addFavourites", addFavourites);
handleTopicRequest("addUser", addUser);

