const express = require('express');
const { AddUser, FindAllUsers, FindSinglUser,UpdateUserPassword, UpdateUser, DeleteUser } = require('../controllers/users.controller');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/users.models");

/* add user */
router.post('/users', AddUser)

/* find all users */
router.get('/users', FindAllUsers)

/* find single user */
router.get('/users/:id', FindSinglUser)

/* add user */
router.put('/users/:id', UpdateUser)

/* add user */
router.delete('/users/:id', DeleteUser)


router.get('/users/:id/applied_offers', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('applied_offers');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user.applied_offers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/users/:id/apply', async (req, res) => {
  try {
    const { offerId } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    const appliedOffers = user.applied_offers;

    // Check if offer already applied for
    if (appliedOffers.includes(offerId)) {
      return res.status(400).json({ msg: 'Offer already applied for' });
    }

    appliedOffers.push(offerId);

    await User.updateOne(
      { _id: userId },
      { $set: { applied_offers: appliedOffers } }
    );

    res.status(200).json(appliedOffers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/users/:userId/applied_offers/:offerId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const offerId = req.params.offerId;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Find the submitted offer and remove it
    user.applied_offers = user.applied_offers.filter((offer) => offer._id.toString() !== offerId);
    await user.save();

    res.status(200).json(user.applied_offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});
router.put("/users/password/:userId", async (req, res) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
  
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;