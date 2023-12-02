const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender_username: {
    type: String,
    required: true,
  },
  receiver_username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;