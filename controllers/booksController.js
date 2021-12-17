const router = require("express").Router();
const Book = require("../models/Book");
const Comment = require('../models/Comment');
router.get("/", async (req, res) => {
  console.log(req.isAuth)
  try{
  const books = await Book.find({});
res.status(200).json(books);
}catch(err){res.status(400).json(err)};
});
router.get("/:bookId", async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
   res.status(200).json(book);
  } catch (err) {
   res.status(400).json('thahts backednderror',err)
   throw new Error(err)
  }
});
router.post("/create", async (req, res) => {
  const bookData = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    addedBy: req.user.userId,
    likes: [],
    comments: [],
  };
  console.log('create book', req.body)
  
  try {
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    
    res.status(400).json(error)
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
  res.status(200).json(comment);
}catch(error){
  res.status(400).json(error)
  throw new Error(error)}

  
})
module.exports = router;
