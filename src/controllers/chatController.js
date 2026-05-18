const Chat = require('../models/Chat');

// Mocked AI responses for MVP
const getMockAiResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('sad') || lowerMessage.includes('stressed')) {
    return "I'm sorry you're feeling this way. Remember to take deep breaths. I'm here to listen.";
  }
  if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
    return "That's wonderful to hear! I'm glad you're having a good day.";
  }
  return "Thank you for sharing that with me. How can I support you further?";
};

// @desc    Send a message and get AI response
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    // Save user message
    const userChat = await Chat.create({
      user: req.user._id,
      sender: 'user',
      message
    });

    // Generate mock AI response
    const aiResponseText = getMockAiResponse(message);

    // Save AI response
    const aiChat = await Chat.create({
      user: req.user._id,
      sender: 'ai',
      message: aiResponseText
    });

    res.status(201).json({
      userMessage: userChat,
      aiResponse: aiChat
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get chat history
// @route   GET /api/chat
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getChatHistory
};
