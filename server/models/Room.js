const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;