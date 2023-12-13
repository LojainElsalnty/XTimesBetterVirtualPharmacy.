const mongoose = require('mongoose');

const MedicineSchema = mongoose.Schema({
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
    type:  String, // Original filename of the image
  },
  isOTC: { //whether it is an overcounter med (otc true) or not (otc false)
    type: Boolean,
    default: true
  },
  archived: {
    type: Boolean, // if archived or not
    default: false,
  },


}, { timestamps: true });

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;