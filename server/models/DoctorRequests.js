const mongoose = require('mongoose');

const DoctorRequestsSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    hourly_rate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    educational_background: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['accepted', 'onhold', 'rejected'],
        required: true,
    },
    speciality: {
        type: String,
        required: true
    },
}, { timestamps: true });


const DoctorRequests = mongoose.model('DoctorRequests', DoctorRequestsSchema);
module.exports = DoctorRequests;