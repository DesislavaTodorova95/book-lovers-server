//import controllers for different routes
const booksController = require("../controllers/booksController");
authController = require("../controllers/authController");
module.exports = (app) => {
  app.use("/books", booksController);
  app.use("/auth", authController);
};
