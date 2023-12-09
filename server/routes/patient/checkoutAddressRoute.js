const express = require('express')
const {
    getOrderDetails, addNewAddress, chooseExistingAddress, proceedToPayment, getAllExistingAddresses, calculateMedicineDiscount
} = require('../../controllers/patient/checkoutAddressController');
const { authenticateToken } = require('../../middleware/authenticateToken');



const router = express.Router()


// GET order details
router.get('/', getOrderDetails)

//Add new delivery Address
router.post('/addNew', authenticateToken, addNewAddress)

//Add new delivery Address
router.post('/existing', chooseExistingAddress)

//GET to payment step
router.get('/payment', authenticateToken, proceedToPayment)

//GET all existing addresses
router.get('/allExisting', authenticateToken, getAllExistingAddresses)

//GET medicine discount
router.post('/medicineDiscount', authenticateToken, calculateMedicineDiscount)


module.exports = router