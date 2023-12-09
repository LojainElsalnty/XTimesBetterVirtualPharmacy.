const mongoose = require('mongoose');

const PackageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    doctor_discount: {
        type: Number,
        required: true,
    },
    medicine_discount: {
        type: Number,
        required: true,
    },
    family_discount: {
        type: Number,
        required: true,
    },
    subscribed_patients: {
        type: []
    },
    valid: {
        type: String,
    },
}, { timestamps: true });


const Package = mongoose.model('Package', PackageSchema);
module.exports = Package;