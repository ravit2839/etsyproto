var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var kafka = require("./kafka/client");


const isAuth = require("./kafka/middlewares/isauth");
const session = require("express-session");
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});


app.post("/register", function (req, res) {
  console.log(req.body + " IN USER REGISTER POST");
  kafka.make_request("addUser", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log(req.body.email + " ----------------------------------");
    console.log(req.body.username + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.json({
        updatedList: results,
      });

      res.end();
    }
  });
});


app.get("/item", function (req, res) {

  kafka.make_request("getProducts", req.body, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.send(results);
    }
  });
});

app.get("/favorites",isAuth,function (req, res) {

  console.log("-----"+req.body+"-----------");
  kafka.make_request("getFavs",req.user, function (err, results) {
    console.log(req.body + " -------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.send(results);
    }
  });
});

app.get("/purchase", isAuth,function (req, res) {
  console.log("get Purchases body");
  console.log(req.body);
  kafka.make_request("getPurchase", req.user, function (err, results) {
    console.log(req.body + " ----------------------------------");
    console.log("in result");
    if (err) {
      console.log(err);
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      console.log(results);
      res.send(results);
    }
  });
});


app.listen(3001);
console.log("Server Listening on port 3001");
