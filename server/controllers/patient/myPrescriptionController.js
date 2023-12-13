const mongoose = require('mongoose');

const Prescription = require('../../models/Prescription');
const Medicine = require('../../models/Medicine');

let prescriptionId = '';
let cartItems = []; // Shared variable for cartItems

// get prescriptionID  from sarah and CREATE cartitems
const getPrescriptionById = async (req, res) => {
    //prescriptionId = '656b5eced6f721891c2f601f';
    //console.log("hena")
    prescriptionId = req.params.id;
   // console.log(prescriptionId)
    try {
        const prescription = await Prescription.findById(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        // res.json(prescription);
        cartItems = prescription.medicines.map(medicine => ({
            medName: medicine.name,
            price_per_item: medicine.price,
            quantity: 1, // Each item starts with quantity 1
            dosage: medicine.dosage,
            //note: medicine.timing,
        }));
        prescription.medicines = cartItems;
        res.json(cartItems);
       // console.log( cartItems)
    } catch (error) {
        console.error('Error fetching prescription:', error);
        res.status(500).send('Internal Server Error');
    }
};

// increment the quantity of a cart item
const updateCartItemQuantity = async (req, res) => {
    const { medName } = req.params;

    const cartItem = cartItems.find((item) => item.medName === medName);
    const medicine = await Medicine.findOne({ name: medName });

    if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
    } else if (cartItem.quantity + 1 > medicine.availableQuantity) {
        return res.status(400).json({ message: 'NO QUANTITY LEFT FOR THIS PRODUCT!' });
    } else {
        cartItem.quantity += 1;
        res.status(200).json(cartItem);
        console.log( cartItems)
    }

    //console.log("inc", cartItems);
};

// decrement the quantity of a cart item
const decrementCartItemQuantity = async (req, res) => {
    const { medName } = req.params;

    const cartItem = cartItems.find((item) => item.medName === medName);
    const medicine = await Medicine.findOne({ name: medName });

    if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
    } else if (cartItem.quantity === 1) {
        return res.status(400).json({ message: 'YOU ARE DELETING THIS ITEM!' });
    } else {
        cartItem.quantity -= 1;
        res.status(200).json(cartItem);
        console.log( cartItems)
    }

   // console.log("dec", cartItems);
};
const deleteMedicineFromPrescription = async (req, res) => {
    const { medName } = req.params;
    const cartItems = req.body.cartItems;
  
    //console.log(cartItems);
    const index = cartItems.findIndex((item) => item.medName === medName);
    // console.log("Cart Items:", cartItems);
  
    if (index == -1) {
      return res.status(404).json({ error: "Cart item not found" });
    }
  
    // Remove the item from the cart using splice
    cartItems.splice(index, 1);
  
    res.status(204).send();
    console.log(cartItems);
};


module.exports = { getPrescriptionById, updateCartItemQuantity, decrementCartItemQuantity ,deleteMedicineFromPrescription};
