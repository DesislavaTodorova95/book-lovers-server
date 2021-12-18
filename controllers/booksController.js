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
  try {


    
  const bookData = {
    title: req.body.body.title,
    author: req.body.body.author,
    genre: req.body.body.genre,
    description: req.body.body.description,
    imageUrl: req.body.body.imageUrl,
    addedBy: req.body.body.addedBy,
    likes: [],
    comments: [],
  };
 console.log(bookData)
  // if(!bookData.title || !bookData.author || !bookData.genre || !bookData.description || !bookData.imageUrl || !bookData.addedBy){
  //   res.status(400).json('All fields are required');
  //   throw new Error('All fields are required')
  // }

  console.log('create book', bookData)
  
  
    const newBook = new Book(bookData);
    await newBook.save();
    res.status(200).json(newBook);
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  throw new Error(error);
  }
});
router.get('/delete/:bookId', async(req, res)=>{
  try{
await Book.findByIdAndDelete(req.params.bookId)
res.status(200).json('BOOK DELETED');}catch(error){
  res.status(400).json('Book cannot be deleted')
}
})
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
  throw new Error(error.message)}

  
});

module.exports = router;
