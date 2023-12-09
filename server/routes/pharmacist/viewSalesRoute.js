const express = require('express')
const {
    filterSalesByDateRange, filterSalesByMedicine
} = require('../../controllers/pharmacist/viewSalesController');


const router = express.Router()


// GET all medicines
//router.get('/medicine/:medName', filterSalesByMedicine)

//GET medicine based on given name
router.get('/:startDate/:endDate/:medName', filterSalesByDateRange);



module.exports = router