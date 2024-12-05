const express = require('express');
const router = express.Router();
const User = require('../models/users.models');
const { Addcandidatform, Updatecandidatform } = require('../controllers/userform.controller');

// POST route to add a candidatform to a user
router.post('/users/:id/candidatform', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const candidatform = await Addcandidatform(req.body);
    user.candidatures.push(candidatform._id);
    await user.save();
    res.status(201).json({
      message: 'CandidatForm created successfully and linked to user',
      candidatform,
      user
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to get all candidatforms for a user
router.get('/users/:id/candidatform', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('candidatform');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.candidatform);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to get a single candidatform for a user
router.get('/users/:userId/candidatform/:candidatFormId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('candidatform');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const candidatform = user.candidatform.find(c => c._id.toString() === req.params.candidatFormId);
    if (!candidatform) {
      return res.status(404).json({ message: 'CandidatForm not found for user' });
    }
    res.status(200).json(candidatform);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/users/:userId/candidatform/:candidatFormId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('candidatform');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const candidatform = user.candidatform.find(c => c._id.toString() === req.params.candidatFormId);
    if (!candidatform) {
      return res.status(404).json({ message: 'CandidatForm not found for user' });
    }
    const updatedCandidatForm = await Updatecandidatform(req.params.candidatFormId, req.body);
    res.status(200).json({
      message: 'CandidatForm updated successfully',
      candidatform: updatedCandidatForm,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
