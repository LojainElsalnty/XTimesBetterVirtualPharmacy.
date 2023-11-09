const asyncHandler = require('express-async-handler');
const medicineOrder = require('../../../models/MedOrder');

const afterCreditCardPayment = asyncHandler(async (req, res) => {


    const latestOrderUser = await medicineOrder.find({ patientUsername: req.body.username }).sort({ _id: -1 }).limit(1).exec();

    const latestOrder = latestOrderUser[0];
    console.log("latest order", latestOrder);


    return res.status(201).json({ order: latestOrder });

}
);

module.exports = { afterCreditCardPayment };