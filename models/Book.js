const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  author: {
    type: String,
    required: [true, "Author is required!"],
  },
  genre:{type: String, required: true},
  description: {
    type: String,
    required: [true, "Description is required!"],
    minlength: [20, "Description must be at least 20 sybmols long!"],
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl is required!"],
    match: [/^https?/, "Image must be a valid url.."],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  addedBy: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
 
  comments:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
   }],
});
module.exports = mongoose.model("Book", BookSchema);
