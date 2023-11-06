const Medicine = require('../../models/Medicine')
const Patient = require('../../models/Patient')
const mongoose = require('mongoose')


//Hardcoded username till I get real logged in username
const username = "john_doe123"

//view order details
const getOrderDetails = async (req, res) => {
    const finalCartItems = req.body.cartItems;
    res.json({ finalCartItems });
}

let deliveryAddress = "";
//add new address
const addNewAddress = async (req, res) => {
    const newAddress = req.body.address
    deliveryAddress = newAddress
    //console.log(deliveryAddress)
    const loggedInPatient = await Patient.findOne({ username: username });
    loggedInPatient.deliveryAddress.push(newAddress);

    try {
        await loggedInPatient.save();
        res.status(200).json(deliveryAddress);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add new delivery address" });
    }
}

//choose an existing address
const chooseExistingAddress = async (req, res) => {
    deliveryAddress = req.body.address
    res.status(200).json(deliveryAddress)

}

module.exports = {
    getOrderDetails,
    addNewAddress,
    chooseExistingAddress
}