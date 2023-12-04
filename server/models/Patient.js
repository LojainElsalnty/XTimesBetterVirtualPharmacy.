const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
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
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    emergency_contact: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    subscribed_package: {
        type: String,
        required: false,
    },
    medicalHistory: {
        data: Buffer,
        contentType: String,
        //required: false,
    },
    deliveryAddress: {
        type: [String],
        default: [],
    },
    walletAmount: {
        type: Number,
        default: 0
    }, notifications: {
        type: [
            {
                message: {
                    type: String,
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    }
}, { timestamps: true });


const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;