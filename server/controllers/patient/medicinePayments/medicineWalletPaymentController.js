const asyncHandler = require('express-async-handler');
const patients = require('../../../models/Patient');
const medOrders = require('../../../models/MedOrder');
const medicines = require('../../../models/Medicine');

const payMedicine = asyncHandler(async (req, res) => {

    const registeredPatient = await patients.findOne({ username: req.body.username });

    if (registeredPatient) {
        let totalAmount = 0;
        for (const item of req.body.cartItems) {

            const medToAdjust = await medicines.findOne({ name: item.medName });


            if (item.quantity > medToAdjust.availableQuantity) {
                return res.status(400).json({ success: false, message: medToAdjust.name +' is now Out of stock!' });
            }

            //console.log('item quantity updated', existingItem.medName, ' new quantuty: ', existingItem.quantity)


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
        const patientWallet = registeredPatient.walletAmount;
        if (totalAmount > patientWallet) {
            return res.status(400).json({ message: ' No Sufficient Funds in the wallet! ' })
        }
        if (totalAmount <= patientWallet) {
            const newWalletAmout = patientWallet - totalAmount;
            const updatedPatient = await patients.findOneAndUpdate({ username: req.body.username }, { walletAmount: newWalletAmout });

            const recentMedOrder = await medOrders.create({
                patientUsername: req.body.username,
                orderItems: req.body.cartItems, deliveryAddress: req.body.deliveryAddress, paymentMethod: 'Wallet',
                status: 'Processing', orderPrice: totalAmount
            })
            return res.status(201).json({ order: recentMedOrder });
        }
    }
    else {
        return res.status(400).json({ message: ' Patient not found' });
    }
})




module.exports = { payMedicine };
