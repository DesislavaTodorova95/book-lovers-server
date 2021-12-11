const router = require("express").Router();
const Book = require("../models/Book");
const Comment = require('../models/Comment');
router.get("/", async (req, res) => {
  const books = await Book.find({});

 res.json(books);
});
router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
   res.json(book);
  } catch (err) {
   res.status(400).json('thahts backednderror',err)
   throw new Error(err)
  }
});
router.post("/create", async (req, res) => {
  const bookData = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    addedBy: req.user._id,
    likes: [],
    comments: [],
  };
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    
    res.json(error)
  throw new Error(error);
  }
});
router.post('/:bookId/comment', async(req,res)=>{
 try { const commentData = {
    content: req.body.content,
    addedAt: req.body.addedAt,
    addetBy: req.user._id
  }
  const comment = new Comment(commentData)
  await comment.save();
  res.json(comment);
}catch(error){
  res.json(error)
  throw new Error(error)}

  
})
module.exports = router;
