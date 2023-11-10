const Medicine = require('../../models/Medicine')
const MedOrder = require('../../models/MedOrder')
const Patient = require('../../models/Patient')
const mongoose = require('mongoose')


//Hardcoded username till I get real logged in username
// const username = "alice_smith"

//view all past orders
const getAllOrders = async (req, res) => {
    const username = req.body.username;
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
    const username = req.body.username;
    const orderId = req.body.orderId
    const order = await MedOrder.findOne({ _id: orderId });
    if (order.status === "Cancelled") {
        return res.status(400).json({ message: "Order is already cancelled" });
    }
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.status = "Cancelled"
    try {
        //update order status in db
        await order.save();
        // Promise.all is to execute multiple asynchronous operations concurrently and wait for all of them to complete
        //update stock quantity in medicine 
        await Promise.all(
            order.orderItems.map(async (item) => {
                const medicine = await Medicine.findOne({ name: item.medName });
                if (medicine) {
                    await Medicine.updateOne(
                        { name: medicine.name },
                        {
                            $inc: {
                                availableQuantity: item.quantity,
                                sales: -item.quantity,
                            }
                        } //inc means current found in db+ given item.quantity
                    );
                }
            })
        );
        // console.log("1st promise successful")
        //update wallet amount in Patient in case payment method is wallet or credit card
        if (order.paymentMethod === 'Wallet' || order.paymentMethod === 'Credit Card') {
            //console.log("inside payment")
            await Promise.all(
                order.orderItems.map(async (item) => {
                    const itemsPrice = item.quantity * item.price_per_item
                    //console.log("itemsPrice ", itemsPrice)
                    await Patient.updateOne(
                        { username: username },
                        { $inc: { walletAmount: itemsPrice } } //inc means current found in db + given total price
                    );
                    //console.log("hena")
                })
            );
        }
        //console.log("2nd promise successful")

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update status" });
    }


}




module.exports = {
    getAllOrders,
    cancelOrder
}