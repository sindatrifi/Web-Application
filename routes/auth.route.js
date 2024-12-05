const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/users.models');
const { JWT_SECRET } = process.env;

router.post('/register', async (req, res) => {
  const { Email,Lastname,Firstname,Age,Phone,Adress,Role, password,ville,Npostal,civilite,Datenaissance } = req.body;
  try {
    // Check if user already exists
    let user1 = await User.findOne({ Email });
    if (user1) {
      return res.status(400).json({ msg: 'User already exists' });
    }


    const user = new User({  Email,Lastname,Firstname,Age,Phone,Adress,Role, password,ville,Npostal,civilite,Datenaissance });
    await user.save();
    

    

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/register', (req, res) => {
  res.json(User);
});


router.post('/login', async (req, res) => {
  const { Email, password } = req.body;

  try {
    const user = await User.findOne({ Email });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    Role= user.Role;

    res.json({ token , Role,userId: user._id});
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;