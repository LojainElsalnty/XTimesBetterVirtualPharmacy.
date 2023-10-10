const mongoose = require('mongoose');

const AdminstratorSchema = mongoose.Schema({
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


const Admin = mongoose.model('Admin', AdminstratorSchema);
module.exports = Admin;
