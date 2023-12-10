const express = require('express')
const {
    filterSalesByMedicine, filterSalesBydate
} = require('../../controllers/pharmacist/filterSalesController');


const router = express.Router()


// GET all medicines
router.get('/medicine/:medName', filterSalesByMedicine)

//GET medicine based on given name
router.get('/enterdate/:date', filterSalesBydate)

//GET all medicines based on medicinalUse
//router.get('/medicinalUse/:medicinalUse', filterMedicineByUse)

module.exports = router