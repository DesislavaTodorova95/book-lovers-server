const router = require("express").Router();
const Book = require("../models/Book");
router.get("/", async (req, res) => {
  const books = await Book.find({});

  return res.json(books);
});
router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
  return res.json(book);
  } catch (err) {
   res.status(400).json(err)
  }
});
router.post("/create", async (req, res) => {
  const bookData = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    addedBy: [],
    likes: [],
    comments: [],
  };
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    console.log("this is the ");
    return console.log(error);
  }
});
module.exports = router;
