const asyncHandler = require('express-async-handler');
const medOrders = require('../../../models/MedOrder');
const medicines = require('../../../models/Medicine');

const payMedicine = asyncHandler(async (req, res) => {

    let totalAmount = 0;
    for (const item of req.body.cartItems) {

        const medToAdjust = await medicines.findOne({ name: item.medName });

        if (medToAdjust) {
            const newAvailableQuantity = medToAdjust.availableQuantity - item.quantity;
            const newSales = medToAdjust.sales + item.quantity;

            const updatedMed = await medicines.findOneAndUpdate(
                { name: item.medName },
                { $set: { availableQuantity: newAvailableQuantity, sales: newSales } },
                { new: true }
            );
        }
        totalAmount += item.price_per_item * item.quantity;

    }
    const recentMedOrder = await medOrders.create({
        patientUsername: req.body.username,
        orderItems: req.body.cartItems, deliveryAddress: req.body.deliveryAddress, paymentMethod: 'Cash on Delivery',
        status: 'Processing', orderPrice: totalAmount
    });

    return res.status(201).json({ order: recentMedOrder });
})

module.exports = { payMedicine };
