const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    patient_username: {
        type: String,
        required: true,
    },
    doctor_username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'canceled', 'reschedule'],
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
}, { timestamps: true });


const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;