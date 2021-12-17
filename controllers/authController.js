const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../services/userServices");
router.post("/login", async (req, res) => {
  try {
  
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json("All input is required");
      throw new Error("All input is required");
    }
    const emailPattern = /[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]+/g;
    const match = email.match(emailPattern);
    if (!match) {
      res.status(400).json("This must be a valid email");
      throw new Error("This must be a valid email");
    }
    const user = await getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      user.token = token;
      req.user = ({email: user.email, token}) // changed
      
      res.json({ userId: user._id, email: user.email, token });
    }
    res.status(400).json("Invalid Credentials");
    throw new Error("Invalid Credentials");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, rePass } = req.body;
    if (!email || !password) {
      {
        res.status(400).json("All inputs are required");
        throw new Error("All inputs are required");
      }
    }

    const emailPattern = /[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]+/g;
    const match = email.match(emailPattern);
    if (!match) {
      res.status(400).json("This must be a valid email");
      throw new Error("This must be a valid email");
    }
    if (password !== rePass) {
      res.status(400).json("Passwords dont match");
      throw new Error("Passwords dont match");
    }

    const oldUser = await getUserByEmail(email);

    if (oldUser) {
      res.status(400).json("User Already Exist. Please Login");
      throw new Error("User Already Exist. Please Login");
    }

    //Encrypt user password
    hashedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await createUser(email, hashedPassword);

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    // save user token
    user.token = token;
    req.user = ({email: user.email, token})
    // return new user
    res.json({ userId: user._id, email: user.email, token });
  } catch (err) {
    res.status(400).json(err);
  }
  // Our register logic ends here
});

module.exports = router;
