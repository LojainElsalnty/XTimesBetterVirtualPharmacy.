const mongoose = require('mongoose');

const PharmacistRequestsSchema = mongoose.Schema({
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
    status: {
        type: String,
        enum: ['accepted', 'onhold', 'rejected'],
        required: true,
    },
}, { timestamps: true });


const PharmacistRequests = mongoose.model('PharmacistRequests', PharmacistRequestsSchema);
module.exports = PharmacistRequests;