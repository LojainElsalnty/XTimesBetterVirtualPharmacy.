const express = require('express')
const {
    getOrderDetails, addNewAddress, chooseExistingAddress
} = require('../../controllers/patient/checkoutAddressController');


const router = express.Router()


// GET order details
router.get('/', getOrderDetails)

//Add new delivery Address
router.post('/addNew', addNewAddress)

//Add new delivery Address
router.post('/existing', chooseExistingAddress)


module.exports = router