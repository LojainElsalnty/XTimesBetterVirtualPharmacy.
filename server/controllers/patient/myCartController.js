const mongoose = require('mongoose')
const Medicine = require('../../models/Medicine')

// Your cart items array
// const cartItems = [


//   {
//     "medName": "Aspirin",
//     "quantity": 95,
//     "price_per_item": 9
//   },
//   {
//     "medName": "med123",
//     "quantity": 4,
//     "price_per_item": 5
//   },
//   {
//     "medName": "panadol",
//     "quantity": 1,
//     "price_per_item": 5
//   }
//   // Add more cart items here
// ];

// View all cart items
const viewAllCartItems = async (req, res) => {
  // console.log("iam here")
  res.status(200).json(cartItems);

};

// increment  the quantity of a cart item

const updateCartItemQuantity = async (req, res) => {
  const { medName } = req.params;
  const cartItems = req.body.cartItems;
  //console.log(medName)

  const cartItem = cartItems.find((item) => item.medName === medName);
  //const { newQuantity } = cartItem.quantity + 1;
  const medicine = await Medicine.findOne({ name: medName });
  //console.log(newQuantity)
  //console.log(cartItem.quantity)
  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  } else if (cartItem.quantity + 1 > medicine.availableQuantity) {
    //alert("NO QUANTITY LEFT IN THE STOCK!!");
    return res.status(400).json({ message: 'NO QUANTITY LEFT FOR THIS PRODUCT!' });

  } else {
    // Update the quantity without removing the "quantity" field
    cartItem.quantity += 1;
    res.status(200).json(cartItem); // Respond with the updated cart item
  }
 // console.log(cartItems)
};


//decrementCartItem
const decrementCartItemQuantity = async (req, res) => {
  const { medName } = req.params;
  const cartItems = req.body.cartItems;

  const cartItem = cartItems.find((item) => item.medName === medName);
  //  const { newQuantity } = cartItem.quantity +1;
  const medicine = await Medicine.findOne({ name: medName });
  //console.log(newQuantity)
  //console.log(cartItem.quantity)
  const index = cartItems.findIndex((item) => item.medName === medName);
  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  else if (cartItem.quantity == 1) {
    return res.status(400).json({ message: 'You Are Delating the item!' });
    // Remove the item from the cart using splice
    cartItems.splice(index, 1);

  }
  else {
    // Update the quantity without removing the "quantity" field
    cartItem.quantity -= 1;
  }

  //console.log(cartItems)

  res.status(200).json(cartItem); // Respond with the updated cart item
};


// Delete a cart item
const deleteCartItem = async (req, res) => {
  //console.log('Request Body:', req.body);
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
  // console.log(cartItems)
};



module.exports = { viewAllCartItems, updateCartItemQuantity, deleteCartItem, decrementCartItemQuantity };
