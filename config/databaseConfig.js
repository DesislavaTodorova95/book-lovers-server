const mongoose = require("mongoose");
const { MONGO_URI } = require("./index");
require("dotenv").config();
module.exports = (app) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on("error", (err) => {
      console.error("Connection error ", err);
      reject(err);
    });
    db.once("open", function () {
      console.log("Database ready");
      resolve();
    });
  });
};
