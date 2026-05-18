const Mood = require('../models/Mood');

const moodScores = {
  'Happy': 2,
  'Calm': 1,
  'Other': 0,
  'Tired': -1,
  'Anxious': -2,
  'Sad': -3
};

const addMood = async (req, res) => {
  const { mood, note } = req.body;

  if (!moodScores.hasOwnProperty(mood)) {
    return res.status(400).json({ message: 'Invalid mood type' });
  }

  try {
    const newMood = await Mood.create({
      user: req.user._id,
      mood,
      score: moodScores[mood],
      note
    });

    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mood history
// @route   GET /api/moods
// @access  Private
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check for stress/burnout notifications
// @route   GET /api/moods/notifications
// @access  Private
const checkStressNotifications = async (req, res) => {
  try {
    // Get last 5 moods
    const recentMoods = await Mood.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    let notification = null;
    let stressLevel = 0;

    if (recentMoods.length >= 3) {
      // Calculate average score of recent moods
      const totalScore = recentMoods.reduce((acc, curr) => acc + curr.score, 0);
      const avgScore = totalScore / recentMoods.length;

      // Simple mock logic for stress detection
      if (avgScore <= -1) {
        stressLevel = 80;
        notification = {
          type: 'High Stress',
          message: 'It looks like you have been experiencing negative moods lately. Consider taking a break or talking to someone.'
        };
      } else if (avgScore < 0) {
        stressLevel = 50;
        notification = {
          type: 'Moderate Stress',
          message: 'You seem a bit tired or anxious. Try a 5-minute breathing exercise.'
        };
      } else {
        stressLevel = 20;
      }
    }

    res.json({
      stressLevel,
      notification
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get weekly insights (Graph data and Stress level)
// @route   GET /api/moods/insights
// @access  Private
const getWeeklyInsights = async (req, res) => {
  try {
    // Get moods from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentMoods = await Mood.find({
      user: req.user._id,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: 1 });

    // 1. Process Graph Data (Last 7 Days)
    // Create a map for the last 7 days to group scores
    const daysMap = {};
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initialize last 7 days in map
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      daysMap[dateString] = { day: dayNames[d.getDay()], totalScore: 0, count: 0 };
    }

    recentMoods.forEach(entry => {
      const dateString = entry.createdAt.toISOString().split('T')[0];
      if (daysMap[dateString]) {
        daysMap[dateString].totalScore += entry.score;
        daysMap[dateString].count += 1;
      }
    });

    const graphData = Object.keys(daysMap).map(date => {
      const data = daysMap[date];
      return {
        date,
        day: data.day,
        // Calculate average score for the day. If no entries, return null or 0.
        averageScore: data.count > 0 ? (data.totalScore / data.count) : 0
      };
    });

    // 2. Process Stress Level and Analysis
    let stressLevel = 0;
    let recommendation = {
      title: "Keep it up!",
      message: "You're doing great. Remember to stay hydrated."
    };
    let peakTime = "afternoon";

    if (recentMoods.length > 0) {
      // Calculate overall average score
      const totalScore = recentMoods.reduce((acc, curr) => acc + curr.score, 0);
      const avgScore = totalScore / recentMoods.length;

      // Mock logic matching the UI's 72% High Stress scenario
      if (avgScore <= 0) {
        // If average score is negative or 0, user is stressed
        // Map score range [-3, 0] to stress range [50%, 100%]
        stressLevel = Math.round(50 + (Math.abs(avgScore) / 3) * 50);

        recommendation = {
          title: "High Stress",
          message: "It looks like a busy week. Try a 5-minute breathing session now."
        };
        peakTime = "evening hours";
      } else {
        // If score is positive, low stress
        stressLevel = Math.round(10 + ((2 - avgScore) / 2) * 30);
      }
    } else {
      // Mock default if no data, as seen in UI design
      stressLevel = 72;
      peakTime = "evening hours";
      recommendation = {
        title: "High Stress",
        message: "It looks like a busy week. Try a 5-minute breathing session now."
      };
    }

    res.json({
      graphData,
      stressAnalysis: {
        level: stressLevel,
        peakTime: `Your stress peaks during the ${peakTime}.`,
        recommendation
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMood,
  getMoods,
  checkStressNotifications,
  getWeeklyInsights
};
