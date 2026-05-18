const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory } = require('../controllers/chatController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, sendMessage)
  .get(protect, getChatHistory);

module.exports = router;
