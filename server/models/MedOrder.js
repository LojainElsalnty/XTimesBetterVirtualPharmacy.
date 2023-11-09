const mongoose = require('mongoose');

const MedOrderSchema = mongoose.Schema({
    patientUsername: {
        type: String,
        required: true,
    },
    orderItems: [
        {
            medName: String,
            quantity: Number,
            price_per_item: Number,
        }
    ],
    deliveryAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['Wallet', 'Credit Card', 'Cash on Delivery'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Processing', 'Delivered', 'Cancelled'],
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const MedOrder = mongoose.model('MedOrder', MedOrderSchema);
module.exports = MedOrder;