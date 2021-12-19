//import controllers for different routes
const booksController = require("../controllers/booksController");
const { isAuth } = require("../middlewares/isAuthGuard");
authController = require("../controllers/authController");
module.exports = (app) => {
  app.use("/books", isAuth(), booksController);
  app.use("/auth", authController);
};
