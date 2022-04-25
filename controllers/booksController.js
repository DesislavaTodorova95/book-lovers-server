const router = require("express").Router();

const Book = require("../models/Book");
const Comment = require('../models/Comment');
const User = require("../models/User");


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
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    addedBy: req.body.addedBy,
    likes: [],
    comments: [],
  };

 
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
router.put('/like/:bookId', async(req, res)=>{
 
  try{
    console.log('req.body', req.body)
    if(req.body.body.userId){
      
  const likedBook =await Book.findById(req.params.bookId);

  console.log('liked', likedBook)
  likedBook.likes.push(req.body.body.userId);
  likedBook.save();
  const userLiked = await User.findById(req.body.body.userId);
  console.log('likedUsers', userLiked)
  userLiked.favouriteBooks.push(req.params.bookId);
  userLiked.save();
  console.log(likedBook);
  res.status(200).json(likedBook);
}else {console.log('no')}
}catch(error){console.log(error);
  res.status(400).json(error.message)}

})
router.put('/edit/:bookId', async(req, res)=>{
  
  try{
 

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
 console.log(bookForEdit);

 res.status(200).json(bookForEdit);
}catch(error){
  console.log(error.message)

res.status(400).json(error.message)
}});
router.get('/favourites/:userId', async(req,res)=>{
  
  try{
    console.log('headersr', req.headers)
    if(req.isAuth){
 const favourites = await Book.find({likes: req.params.userId});
 
 res.status(200).json(favourites);}else {throw new Error('notallowed')}}catch(error){res.status(400).json(error.message)}
})
module.exports = router;
