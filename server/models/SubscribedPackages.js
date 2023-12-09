const mongoose = require('mongoose');

const SusbcribedPackageSchema = mongoose.Schema({
    patient_username: {
        type: String,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },

    package_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'unsubscribed',
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },

}, { timestamps: true });


const SusbcribedPackages = mongoose.model('SusbcribedPackages', SusbcribedPackageSchema);
module.exports = SusbcribedPackages;