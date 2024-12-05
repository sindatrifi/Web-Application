const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');


router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});

module.exports = router;