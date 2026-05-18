const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const moodRoutes = require('./routes/moodRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/moods', moodRoutes);

app.get('/', (req, res) => {
  res.send('SarangPikir API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
