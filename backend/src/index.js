const cors = require("cors");
const config = require("config");
const express = require("express");
const fs = require("fs");
require("express-async-errors");
const db = require("./models");
const allRoutes = require("./routes");
const catchUnhandleExceptions = require("./middlewares/exception-handling");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.static("uploads"));
app.use(express.json());
app.use("/", allRoutes);
app.use(catchUnhandleExceptions);

async function bootstrap() {
  console.log("Please wait for the server and db to run");

  // try {
    if (!fs.existsSync("./uploads")) {
      console.log("upload dir not exists");
      fs.mkdirSync("./uploads");
    }

    await db.sequelize.sync({ force: config.get("db.forceSync") });
    const PORT = process.env.PORT || 3001;
    
    app.on('error', function (e) {
      app.listen(8080)
    });
    app.listen(8000);
  
}
bootstrap()
module.exports= bootstrap