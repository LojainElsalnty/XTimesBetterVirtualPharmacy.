const mongoose = require('mongoose');

const PrescriptionSchema = mongoose.Schema({
    patient_username: {
        type: String,
        required: true,
    },
    doctor_username: {
        type: String,
        required: true,
    },
    visit_date: {
        type: String,
        required: true,
    },
    filled: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});


const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;
