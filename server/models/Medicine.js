const mongoose = require('mongoose');

const MedicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        requried: true,
    },
    active_ingredients: {
        type: [String],
        required: true,
    },
    available_quantity: {
        type: Number,
        required: true,
    },
    medicinal_use: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {timestamps: true});


const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;
