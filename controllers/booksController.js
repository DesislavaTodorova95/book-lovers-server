const router = require("express").Router();

const Book = require("../models/Book");
const Comment = require('../models/Comment');


router.get("/", async (req, res) => {
 
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
if(req.isAuth){
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
    res.status(200).json(newBook);}else {
   console.log('not auto')
     res.status(400).json('not authorized');
    }

  } catch (error) {
    
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
router.post('/edit/:bookId', async(req, res)=>{
  try{
    console.log(req.body.body.title);
    console.log(req.body.body.author);
    console.log(req.body.body.genre);
    console.log(req.body.body.description);
    console.log(req.body.body.imageUrl);

    if(!req.body.body.title || !req.body.body.author|| !req.body.body.genre || !req.body.body.description ||  !req.body.body.imageUrl){
      
      throw new Error('all fields are required!!!')
    }
  const bookForEdit = await Book.findById(req.params.bookId);
  bookForEdit.title = req.body.body.title; 
 bookForEdit.author= req.body.body.author;
 bookForEdit.genre =req.body.body.genre;
 bookForEdit.description= req.body.body.description; 
 bookForEdit.imageUrl= req.body.body.imageUrl;
 bookForEdit.save();
 res.status(200).json(bookForEdit);
}catch(error){
  console.log('ohh noo ', error)

res.status(400).json(error)
}})

module.exports = router;
