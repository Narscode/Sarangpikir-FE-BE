const express = require('express');
const router = express.Router();
const { addMood, getMoods, checkStressNotifications, getWeeklyInsights } = require('../controllers/moodController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, addMood)
  .get(protect, getMoods);

router.get('/insights', protect, getWeeklyInsights);
router.get('/notifications', protect, checkStressNotifications);

module.exports = router;
