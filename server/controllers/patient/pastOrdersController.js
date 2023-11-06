const Medicine = require('../../models/Medicine')
const MedOrder = require('../../models/MedOrder')
const mongoose = require('mongoose')


//Hardcoded username till I get real logged in username
const username = "john_doe123"

//view all past orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await MedOrder.find({ patientUsername: username });
        res.status(200).json(orders)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//cancel an order
const cancelOrder = async (req, res) => {
    const orderId = req.body.orderId;
    const order = await MedOrder.findOne({ _id: orderId });
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.status = "Cancelled"
    try {
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update status" });
    }


}




module.exports = {
    getAllOrders,
    cancelOrder
}