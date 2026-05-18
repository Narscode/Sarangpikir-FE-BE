const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  mood: {
    type: String,
    required: true,
    enum: ['Happy', 'Calm', 'Anxious', 'Sad', 'Tired', 'Other']
  },
  score: {
    type: Number,
    required: true,
    default: 0 // Will assign values, e.g., Happy=2, Calm=1, Tired=0, Anxious=-1, Sad=-2
  },
  note: {
    type: String
  }
}, { timestamps: true });

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;
