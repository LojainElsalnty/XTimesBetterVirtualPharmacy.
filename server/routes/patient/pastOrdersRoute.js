const express = require('express')
const {
    getAllOrders, cancelOrder
} = require('../../controllers/patient/pastOrdersController');


const router = express.Router()


// GET all orders order details
router.get('/', getAllOrders)

//POST Cancel order
router.post('/', cancelOrder)

module.exports = router