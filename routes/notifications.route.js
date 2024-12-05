const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.model');

// Create a new notification
router.post('/notification', async (req, res) => {
  const { userId, message } = req.body;
  const notification = new Notification({
    userId,
    message,
    timestamp: new Date(),
  });
  try {
    const savedNotification = await notification.save();
    res.json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all notifications for a user
router.get('/notifications/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const notifications = await Notification.find({ userId: userId });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.delete('/notifications/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedNotification = await Notification.findByIdAndDelete(id);
      if (!deletedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      res.json(deletedNotification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;