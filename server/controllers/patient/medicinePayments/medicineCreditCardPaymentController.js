const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const medicineOrder = require('../../../models/MedOrder');
const medicines = require('../../../models/Medicine');

const stripe = require('stripe')(process.env.STRIPE_PRIV_KEY);


const payMedicine = asyncHandler(async (req, res) => {

    // req.body.cartItems.map(async item => {
    //     const medToAdjust = await medicines.findOne({ name: item.medName });
    //     if (item.quantity > medToAdjust.availableQuantity) {
    //         return res.status(400).json({ success: false, message: medToAdjust.name +' Out of stock!' , outofstock: true});
    //     }
    // })
    try {
        //console.log(req.body)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',

            line_items: req.body.cartItems.map(item => {

                return {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: item.medName
                        },

                        unit_amount: item.price_per_item * 100
                    },
                    quantity: item.quantity
                }
            }),

            success_url: 'http://localhost:5173/patient/successPayment',
            cancel_url: 'http://localhost:5173/patient/unsuccessPayment'  // will change it
        })

        // Adjust medicine availableQuantity & Sales
        let totalAmount = 0;
        for (const item of req.body.cartItems) {
            
            const medToAdjust = await medicines.findOne({ name: item.medName });
            if (item.quantity > medToAdjust.availableQuantity) {
                return res.status(400).json({ success: false, message: medToAdjust.name +' is now Out of stock!' , outofstock: true});
            }

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
        const recentMedOrder = await medicineOrder.create({
            patientUsername: req.body.username,
            orderItems: req.body.cartItems, deliveryAddress: req.body.deliveryAddress, paymentMethod: 'Credit Card',
            status: 'Processing', orderPrice: totalAmount
        });

        return res.status(201).json({ success: true, url: session.url, successURL: session.success_url, orderInfo: recentMedOrder});
    } catch (error) {
        // Respond with an error message if there is an error
        return res.status(500).json({ success: false, error: 'An error occurred while creating the session.' });
    }
})

module.exports = { payMedicine };