//const config = require("config");
const jwt = require("jsonwebtoken");
//const Exceptions = require("../utils/custom-exceptions");

module.exports = async function (req, res, next) {
  const token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (!token){
  console.log("No Token Provided");
    //throw new Exceptions.UnauthorizedException("Access denied. No token provided");
  }

  try {
    const decoded = jwt.verify(token, "my-secret-key");
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error in getting token..")
   // throw new Exceptions.UnauthorizedException("Invalid token");
  }
};
