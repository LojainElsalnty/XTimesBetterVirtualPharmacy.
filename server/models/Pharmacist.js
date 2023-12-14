const mongoose = require('mongoose');

const PharmacistSchema = mongoose.Schema({
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
    nationalID: {
        //type: mongoose.Schema.Types.Mixed,
        name: String,
        path: String,
        contentType: String,
        //required: true
        //type: String,
        //required: true,

    },
    workingLicense: {
        //type: mongoose.Schema.Types.Mixed,
        name: String,
        path: String,
        contentType: String,
        //required: true
        //type: String,
        //required: true,
    },
    pharmacyDegree: {
        //type: mongoose.Schema.Types.Mixed,
        name: String,
        path: String,
        contentType: String,
        //required: true
        //type: String,
        //required: true,
    },
    walletAmount: {
        type: Number,
        default: 0
    },
    notifications: {
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
    },
}, { timestamps: true });


const Pharmacist = mongoose.model('Pharmacist', PharmacistSchema);
module.exports = Pharmacist;