
const User = require("../models/User");

async function createUser(email, hashedPassword) {
  const user = new User({
    email,
    hashedPassword,
    favouriteBooks:[]
  });
 
  await user.save();
  return user;
}
async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i')
  const user =  User.findOne({
    email: { $regex: pattern },
  });
  
  return user;
 
}

module.exports = {
  createUser,
  getUserByEmail,
};

