const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        requried: true,
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
    affilitation: {
        type: String,
        required: true,
    },
    educational_background: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
