const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    minlength: [4, "password must be minimum 4 characters long"],
    required: [true, "Password is required!"],
  },

  favouriteBooks: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] },
  ],
});

module.exports = mongoose.model("User", UserSchema);
