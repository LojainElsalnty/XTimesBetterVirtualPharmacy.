const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;