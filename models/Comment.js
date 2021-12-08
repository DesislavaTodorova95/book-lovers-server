const mongoose = require("mongoose");
const CommentShema = new mongoose.Schema({
  addedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  content: [
    {
      type: String,
      minlength: [3, "This comments must be at least 12characters long"],
      required: true,
    },
  ],
  addedAt: [{ type: Date, default: Date.now }],
});
module.exports = mongoose.model('Comment', CommentShema)
