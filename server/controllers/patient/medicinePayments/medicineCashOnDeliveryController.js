const asyncHandler = require('express-async-handler');
const medOrders = require('../../../models/MedOrder');
const medicines = require('../../../models/Medicine');

const pharmacistsModel = require('../../../models/Pharmacist');
const { sendEmail } = require('./emailHelper'); 

const payMedicine = asyncHandler(async (req, res) => {

     // Fetch all pharmacists from the database
     const pharmacists = await pharmacistsModel.find({});

    let totalAmount = 0;
    for (const item of req.body.cartItems) {

        const medToAdjust = await medicines.findOne({ name: item.medName });
        if ( medToAdjust.availableQuantity==0) {
               
            return res.status(400).json({ success: false, message: medToAdjust.name +` medicine is now Out of stock!` });
        }
        else if (item.quantity > medToAdjust.availableQuantity) {
           
            return res.status(400).json({ success: false, message:  `Only ${medToAdjust.availableQuantity} items are available from ${medToAdjust.name} medicine!` });
        }

        if (medToAdjust) {
            const newAvailableQuantity = medToAdjust.availableQuantity - item.quantity;
            const newSales = medToAdjust.sales + item.quantity;

            const updatedMed = await medicines.findOneAndUpdate(
                { name: item.medName },
                { $set: { availableQuantity: newAvailableQuantity, sales: newSales } },
                { new: true }
            );
            if(newAvailableQuantity === 0){

                // Loop through the pharmacists and send emails
                pharmacists.forEach(async (pharmacist) => {
                    // pharmacist to get mail , email Subject , Email Text
                    await sendEmail(pharmacist.email, 'Medicine Out of Stock', `Dear ${pharmacist.name},\n\nThis is to notify you that ${medToAdjust.name} medicine is currently out of stock.`);

                    await pharmacistsModel.findByIdAndUpdate(
                        pharmacist._id,
                        {
                          $push: {
                            notifications: {

                              message: `${medToAdjust.name} medicine is currently out of stock.`,
                            },
                          },
                        },
                        { new: true }
                      );
             
                });

            }
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
