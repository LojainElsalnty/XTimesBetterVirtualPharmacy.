const mongoose = require('mongoose');

const FamilySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    national_id: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    relation: {
        type: String,
        enum: ['wife', 'husband', 'children'],
        required: true,
    },
    patient_username: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Family = mongoose.model('Family', FamilySchema);
module.exports = Family;