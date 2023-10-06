const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    activeIngredients: {
        type: [String],
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true,
    },
    medicinalUses: {
        type: [String],
        required: true,
    },
    sales: {
        type: Number,
        default: 0,
    },
    // Add an image field
    image: {
        data: Buffer, // Binary image data lesa hashof ah alle byhsl
        contentType: String, // Content type (e.g., 'image/jpeg', 'image/png') //lesa bardo 
        filename: String, // Original filename of the image
    },

}, { timestamps: true });

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;
