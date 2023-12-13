const express = require('express');
const router = express.Router();
const{viewAllCartItems,updateCartItemQuantity,deleteCartItem,decrementCartItemQuantity}
 =
 require('../../controllers/patient/myCartController')

//search for a pharmacist by username
router.get('/viewAllCartItems', viewAllCartItems);
router.put('/updateCartItemQuantity/:medName', updateCartItemQuantity);
router.put('/decrementCartItemQuantity/:medName', decrementCartItemQuantity);
router.delete('/deleteCartItem/:medName',deleteCartItem);


module.exports = router;