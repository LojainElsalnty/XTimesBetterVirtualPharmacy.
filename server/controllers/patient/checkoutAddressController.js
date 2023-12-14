const Medicine = require('../../models/Medicine')
const Patient = require('../../models/Patient')
const subsPackageModel = require('../../models/SubscribedPackages')
const PackageModel = require('../../models/Package')
const mongoose = require('mongoose')


//Hardcoded username till I get real logged in username
// const username = "alice_smith"

let cartItems;
//view order details
const getOrderDetails = async (req, res) => {
    cartItems = req.body.cartItems;
    console.log("get order det: ", cartItems)
    res.json({ cartItems });
}

let deliveryAddress = "";
//add new address
const addNewAddress = async (req, res) => {
    const username = req.body.username
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

//get next checkout step (send final cartItems & delivery address)
const proceedToPayment = async (req, res) => {
    const username = req.body.username;
    // console.log(cartItems)
    res.json({ cartItems, deliveryAddress, username }) //added username
}


//get all existing addresses of logged in user
const getAllExistingAddresses = async (req, res) => {
    const username = req.body.username;
    const loggedInPatient = await Patient.findOne({ username: username });
    const existingAddresses = loggedInPatient.deliveryAddress
    res.status(200).json(existingAddresses);
}


//get patient's package discount if exists
const calculateMedicineDiscount = async (req, res) => {
    const username = req.body.username;
    const cartItems = req.body.cartItems;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    //console.log(today)
    try {
        const subscribedPackage = await subsPackageModel.find({
            patient_username: username,
            status: { $in: ['subscribed', 'cancelled'] },
            end_date: { $gte: today }
        }).sort({ start_date: -1 }).limit(1);
        console.log(subscribedPackage)
        if (subscribedPackage.length > 0) {
            const packageInfo = await PackageModel.findOne({ name: subscribedPackage[0].package_name });
            const discount = packageInfo.medicine_discount / 100;
            // Applying discount to each item in cartItems
            const discountedCartItems = cartItems.map(item => {
                const discountedPrice = parseFloat((item.price_per_item * (1 - discount)).toFixed(2));
                return { ...item, discountedPrice };
            });
            console.log(discount)
            res.status(200).json(discountedCartItems);

        } else {
            const discountedCartItems = cartItems.map(item => ({ ...item, discountedPrice: item.price_per_item }));
            res.status(200).json(discountedCartItems);
        }
    } catch (error) {
        console.error('Error fetching medicine discount:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getOrderDetails,
    addNewAddress,
    chooseExistingAddress,
    proceedToPayment,
    getAllExistingAddresses,
    calculateMedicineDiscount
}