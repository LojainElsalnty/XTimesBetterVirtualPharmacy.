const express = require('express')
const {
    filterSalesByMonth
} = require('../../controllers/admin/viewSalesController');


const router = express.Router()


// GET all medicines
//router.get('/medicine/:medName', filterSalesByMedicine)

//GET medicine based on given name
router.get('/month/:month', filterSalesByMonth)

//GET all medicines based on medicinalUse
//router.get('/medicinalUse/:medicinalUse', filterMedicineByUse)

module.exports = router