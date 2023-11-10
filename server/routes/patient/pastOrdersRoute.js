const express = require('express')
const {
    getAllOrders, cancelOrder
} = require('../../controllers/patient/pastOrdersController');
const { authenticateToken } = require('../../middleware/authenticateToken');

const router = express.Router()


// GET all orders order details
router.get('/', authenticateToken, getAllOrders)

//POST Cancel order
router.post('/', authenticateToken, cancelOrder)

module.exports = router